import User from "../../modals/User";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    console.log(req.body);

    let user = new User(req.body);
    user.save();

    res.status(200).json("success");
  } else {
    res.status(400).json("this is bad request");
  }
};

export default connectDb(handler);
