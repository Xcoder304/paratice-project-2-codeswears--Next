import User from "../../../modals/User";
import connectDb from "../../../middleware/mongoose";
let CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    let token = req.body.token;
    let Tokenres = jwt.verify(token, process.env.NEXT_PUBLIC_JWTS_SECRET);
    let dbuser = await User.findOne({ email: Tokenres.email });

    let bytes = CryptoJS.AES.decrypt(dbuser.password, "fuckyouhacker22");
    let decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

    console.log(Tokenres.email);
    console.log(decryptedPassword);

    if (
      decryptedPassword == req.body.password &&
      req.body.newpassword == req.body.cnewpassword
    ) {
      let updatepassword = await User.findOneAndUpdate(
        { email: Tokenres.email },
        {
          password: CryptoJS.AES.encrypt(
            req.body.cnewpassword,
            "fuckyouhacker22"
          ).toString(),
        }
      );

      console.log(updatepassword);
      res.status(200).json({ success: true, updatepassword });
    }
    if (decryptedPassword !== req.body.password) {
      res.status(200).json({
        success: false,
        error: "Your password is incorrect please try again",
      });
    }
    if (req.body.newpassword !== req.body.cnewpassword) {
      res.status(200).json({
        success: false,
        error: "Whoops! comfirm password did not match with new password!",
      });
    }
  } else {
    res.status(200).json({ success: false, error: "bad req" });
  }
};

export default connectDb(handler);
