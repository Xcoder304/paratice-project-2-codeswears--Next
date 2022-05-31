import Order from "../../modals/Order";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let order = await new Order(req.body);
    await order.save();
    // for (let item in order) {
    //   let p = order[item].productsInfo;
    //   console.log(p);
    // }
    // let orderId = order.id;
    // let product = Product.find({_id: })
    res.status(200).json("success");
  } else {
    res.status(400).json("this is bad request");
  }
};

export default connectDb(handler);
