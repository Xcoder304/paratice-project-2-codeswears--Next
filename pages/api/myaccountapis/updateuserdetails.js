import User from "../../../modals/User";
import connectDb from "../../../middleware/mongoose";
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    let token = req.body.token;
    let Tokenres = jwt.verify(token, process.env.NEXT_PUBLIC_JWTS_SECRET);
    let user = await User.findOneAndUpdate(
      { email: Tokenres.email },
      {
        name: req.body.name,
        address: req.body.address,
        phonenumber: req.body.phonenumber,
        pincode: req.body.pincode,
      }
    );
    const { name, address, phonenumber, pincode } = user;
    if (
      req.body.name == name &&
      req.body.address == address &&
      req.body.phonenumber == phonenumber &&
      req.body.pincode == pincode
    ) {
      res
        .status(200)
        .json({ success: false, error: "This record already exist" });
    }

    res
      .status(200)
      .json({ success: true, name, address, phonenumber, pincode });
  } else {
    res.status(400).json({ success: false, error: "bad req" });
  }
};

export default connectDb(handler);
