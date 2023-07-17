const User = require("../models/userModel");

const forgotPass = require("../models/forgotPassModel");

const sib = require("sib-api-v3-sdk");

const bcrypt = require("bcrypt");

const transEmailApi = new sib.TransactionalEmailsApi();
const { v4: uuidv4 } = require("uuid");
const { where } = require("sequelize");

exports.forgotPass = async (req, res, next) => {
  const client = sib.ApiClient.instance;
  const apiKey = client.authentications["api-key"];
  apiKey.apiKey = process.env.SIB_API_KEY;

  const { email } = req.body;
  try {
    let user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new Error("please enter valid registered email id");
    }
    const sender = {
      email: "dattatreyadattu25@gmail.com",
    };
    const userEmail = user.email;
    const id = uuidv4();
    const recivers = [
      {
        email: userEmail,
      },
    ];

    await transEmailApi.sendTransacEmail({
      sender,
      to: recivers,
      subject: "reset password link",
      htmlContent: `http://localhost:3000/user/resetPassword/${id}`,
    });

    await forgotPass.create({
      email: user.email,
      userId: user.id,
      uuid: id,
      isActive: true,
    });
    res.status(200).json({ message: "password reset link sent succesfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const { password, id } = req.body;
    const passwordDetails = await forgotPass.findOne({
      where: { uuid: id, isActive: true },
    });
    const hash = await bcrypt.hash(password, 5);
    await User.update(
      { password: hash },
      { where: { id: passwordDetails.userId } }
    );
    await passwordDetails.update(
      { isActive: false },
      { where: { userId: passwordDetails.id, uuid: id } }
    );
    res.status(200).json({ message: "password updated succesfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};
