import User from "../../modals/User";
import connectDb from "../../middleware/mongoose";
let CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    let user = await User.findOne({ email: req.body.email });
    let bytes = CryptoJS.AES.decrypt(user.password, "fuckyouhacker22");
    let decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
    if (user) {
      if (
        req.body.email == user.email &&
        req.body.password == decryptedPassword
      ) {
        res
          .status(200)
          .json({ success: true, email: user.email, name: user.name });
      } else {
        res.status(200).json({
          success: false,
          error: "Wrong Email or Password please try again :)",
        });
      }
    } else {
      res.status(200).json({
        success: false,
        error: "User Not Founded Please SignUp First",
      });
    }
  } else {
    res.status(400).json("this is bad request");
  }
};

export default connectDb(handler);
