import User from "../../modals/User";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      if (req.body.email == user.email && req.body.password == user.password) {
        res
          .status(200)
          .json({ success: true, email: user.email, name: user.name });
      } else {
        res.status(200).json({
          success: false,
          error: "Wrong Email or Password please try again :)",
        });
      }
    } else {
      res.status(200).json({
        success: false,
        error: "User Not Founded Please SignUp First",
      });
    }
  } else {
    res.status(400).json("this is bad request");
  }
};

export default connectDb(handler);
