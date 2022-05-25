import User from "../../modals/User";
import connectDb from "../../middleware/mongoose";
let CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { name, email } = req.body;
    let user = new User({
      name,
      email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        "fuckyouhacker22"
      ).toString(),
    });
    user.save();

    res.status(200).json("success");
  } else {
    res.status(400).json("this is bad request");
  }
};

export default connectDb(handler);
