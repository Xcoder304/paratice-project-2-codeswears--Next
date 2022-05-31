// import Order from "../../modals/Order";
import connectDb from "../../middleware/mongoose";
import Product from "../../modals/Product";

const handler = async (req, res) => {
  let allproducts = req.body.allproducts;
  for (let item in allproducts) {
    await Product.findOneAndUpdate(
      { slug: allproducts[item].slug },
      { $inc: { availableQty: -allproducts[item].userSelectedQty } }
    );
  }

  res.status(200).json(allproducts);
};
export default connectDb(handler);
