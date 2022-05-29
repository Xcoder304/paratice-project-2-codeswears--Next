import Cart from "../../modals/Cart";
import connectDb from "../../middleware/mongoose";
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  let token = req.body.token;
  let tokeData = jwt.verify(token, process.env.NEXT_PUBLIC_JWTS_SECRET);
  let products = await Cart.find({ email: tokeData.email });

  res.status(200).json({ products });
};

export default connectDb(handler);
