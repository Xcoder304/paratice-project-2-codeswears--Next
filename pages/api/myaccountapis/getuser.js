import User from "../../../modals/User";
import connectDb from "../../../middleware/mongoose";
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  let token = req.body.token;
  let Tokenres = jwt.verify(token, process.env.NEXT_PUBLIC_JWTS_SECRET);
  let user = await User.findOne({ email: Tokenres.email });
  res.status(200).json({ user });
};

export default connectDb(handler);
