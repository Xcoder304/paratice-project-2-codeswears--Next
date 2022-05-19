import Product from "../../modals/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  let products = await Product.find();
  let tshits = {};

  for (let item of products) {
    if (item.title in tshits) {
      if (
        !tshits[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        tshits[item.title].color.push(item.color);
      }
      if (
        !tshits[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        tshits[item.title].size.push(item.size);
      }
    } else {
      tshits[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        tshits[item.title].color = [item.color];
        tshits[item.title].size = [item.size];
      }
    }
  }
  res.status(200).json({ tshits });
};

export default connectDb(handler);
