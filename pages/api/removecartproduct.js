import Cart from "../../modals/Cart";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let p = await Cart.findByIdAndRemove(req.body.id, req.body);
    res.status(200).json(p, "scucess");
  } else {
    res.status(400).json("this is bad request");
  }
};

export default connectDb(handler);
