const userDetails = require("../models/userDetailsModel");

exports.postUserDetails = async (req, res) => {
  try {
    const { fullName, imageUrl } = req.body;
    const user = userDetails.findOne({
      where: {
        userId: req.userId,
      },
    });
    if (user) {
      throw new Error("your details already saved");
    }
    await userDetails.create({
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
