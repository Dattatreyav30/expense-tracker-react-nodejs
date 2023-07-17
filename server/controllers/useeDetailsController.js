const UserDetails = require("../models/userDetailsModel");

const User = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");
const sib = require("sib-api-v3-sdk");
const transEmailApi = new sib.TransactionalEmailsApi();

const sendEmailFunction = async (userId) => {
  const user = await User.findByPk(userId);
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
    htmlContent: `http://localhost:5000/verify-email?id=${userId}&token=${id}`,
  });
};

exports.postUserDetails = async (req, res) => {
  try {
    const { fullName, imageUrl } = req.body;
    const user = await UserDetails.findOne({
      where: {
        userId: req.userId,
      },
    });
    if (user) {
      throw new Error("your details already saved");
    }

    await sendEmailFunction(req.userId);

    await UserDetails.create({
      fullName: fullName,
      imageUrl: imageUrl,
      userId: req.userId,
      isVerified: false,
    });
    res.status(200).json({ message: "Details saved succesfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.verifyClickedEmail = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.query.id);
    if (!user) {
      throw new Error("please try again");
    }
    const userDetail = await UserDetails.findOne({
      where: {
        userId: user.id,
      },
    });
    userDetail.isVerified = true;
    userDetail.save();
    const htmlResponse = `
      <html>
        <head>
          <title>Password Verification</title>
        </head>
        <body>
          <h1>Your password is verified</h1>
          <p>Congratulations! Your password has been successfully verified.</p>
        </body>
      </html>
    `;
    res.status(200).send(htmlResponse);
  } catch (Err) {
    res.status(500).json({ message: Err.message });
  }
};

exports.checkUser = async (req, res) => {
  try {
    const userDetails = await UserDetails.findOne({
      where: { userId: req.userId },
    });

    if (!userDetails) {
      throw new Error("user not found");
    }
    res.status(200).json({ message: "successfull" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
