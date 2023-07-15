const UserDetails = require("../models/userDetailsModel");

const User = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");
const sib = require("sib-api-v3-sdk");
const userDeatils = require("../models/userDetailsModel");
const transEmailApi = new sib.TransactionalEmailsApi();

exports.postUserDetails = async (req, res) => {
  try {
    const { fullName, imageUrl } = req.body;
    const user = UserDetails.findOne({
      where: {
        userId: req.userId,
      },
    });
    if (user) {
      throw new Error("your details already saved");
    }
    await UserDetails.create({
      fullName: fullName,
      imageUrl: imageUrl,
      userId: req.userId,
    });
    res.status(200).json({ message: "Details saved succesfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      throw new Error("some error occured : please login again");
    }
    const email = user.email;
    const client = sib.ApiClient.instance;
    const apiKey = client.authentications["api-key"];
    apiKey.apiKey = process.env.SIB_API_KEY;
    const id = uuidv4();

    const sender = {
      email: "dattatreyadattu25@gmail.com",
    };

    const recivers = [
      {
        email: email,
      },
    ];
    await transEmailApi.sendTransacEmail({
      sender,
      to: recivers,
      subject: "reset password link",
      htmlContent: `http://localhost:5000/verify-email/${id}`,
    });
    return res
      .status(200)
      .json({ message: "reset passowrd link sent succesfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.verifyClickedEmail = async (req, res, next) => {
  try {
    const user = await UserDetails.findByPk(req.userId);
    if (!user) {
      throw new Error("please try again");
    }
    user.isVerified = true;
    await user.save();
  } catch (Err) {
    res.status(500).json({ message: Err.message });
  }
};
