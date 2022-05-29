import Order from "../../modals/Order";
import connectDb from "../../middleware/mongoose";
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    let token = req.body.token;
    let data = jwt.verify(token, process.env.NEXT_PUBLIC_JWTS_SECRET);
    let orders = await Order.find({ "userDetails.email": data.email }).sort({
      createdAt: -1,
    });

    res.status(200).json({ orders });
  }
};

export default connectDb(handler);
