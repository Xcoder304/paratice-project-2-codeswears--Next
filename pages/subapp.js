import { useLayoutEffect } from "react";
import { selectuserVal, setUserVal } from "../Redux/features/UserState";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/dist/client/router";

const Subapp = () => {
  const router = useRouter();
  const userValue = useSelector(selectuserVal);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (userValue == null) {
      let token = localStorage.getItem("token");
      dispatch(setUserVal(token));
    }
  }, [router.query]);

  console.log("this is user value", userValue);
};

export default Subapp;
