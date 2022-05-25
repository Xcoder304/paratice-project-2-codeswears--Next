import Cart from "../../modals/Cart";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let p = await new Cart(req.body);
    await p.save();
    res.status(200).json({ success: true, error: "" });
  } else {
    res.status(400).json({ success: false, error: "this is bad request" });
  }
};

export default connectDb(handler);
