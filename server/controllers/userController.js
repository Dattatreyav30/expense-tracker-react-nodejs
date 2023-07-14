const User = require("../models/userModel");

const bcrypt = require("bcrypt");

exports.postUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = User.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      throw new Error("user already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const userCreation = await User.create({
      email: email,
      password: hashedPassword,
    });
    if (!userCreation) {
      throw new Error("error while creating user");
    }
    res.status(200).json({ message: "user created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
