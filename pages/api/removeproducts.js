import Product from "../../modals/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    for (let i = 0; i < req.body.length; i++) {
      let p = await Product.findByIdAndRemove(req.body[i]._id, req.body[i]);
    }
    res.status(200).json("success");
  } else {
    res.status(400).json("this is bad request");
  }
};

export default connectDb(handler);
