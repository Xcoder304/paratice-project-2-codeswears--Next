import React, { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Myaccount = () => {
  const [user, setuser] = useState(null);
  const router = useRouter();
  //   user details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [pincode, setPinCode] = useState("");
  const [password, setpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [cnewpassword, setCnewPassword] = useState("");
  const [changePassHideBtn, setchangePassHideBtn] = useState(true);

  useEffect(() => {
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("token") == null
    ) {
      router.push("/login");
    }

    const fetchUser = async () => {
      let f = await fetch(
        `${process.env.HOSTING_NAME}/api/myaccountapis/getuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: localStorage.getItem("token") }),
        }
      );
      let res = await f.json();
      setuser(res.user);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAddress(user.address);
      setPhoneNumber(user.phonenumber);
      setPinCode(user.pincode);
    }
  }, [user]);

  useEffect(() => {
    if (
      password.length > 4 &&
      newpassword.length > 4 &&
      cnewpassword.length > 4
    ) {
      setchangePassHideBtn(false);
    } else {
      setchangePassHideBtn(true);
    }
  }, [password, newpassword, cnewpassword]);

  const UPDATE_USER_DETAILS = async (e) => {
    e.preventDefault();
    let data = {
      token: localStorage.getItem("token"),
      name: name,
      address: address,
      phonenumber: phonenumber,
      pincode: pincode,
    };
    let f = await fetch(
      `${process.env.HOSTING_NAME}/api/myaccountapis/updateuserdetails`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    let res = await f.json();
    if (res.success) {
      toast.success("Your Details has be changed", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      router.push(`${process.env.HOSTING_NAME}/myaccount`);
      setpassword("");
      setnewpassword("");
      setCnewPassword("");
    } else {
      toast.error(res.error, {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const UPDATE_PASSWORD = async (e) => {
    e.preventDefault();
    let data = {
      token: localStorage.getItem("token"),
      password: password,
      newpassword: newpassword,
      cnewpassword: cnewpassword,
    };

    let f = await fetch(
      `${process.env.HOSTING_NAME}/api/myaccountapis/updatepassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    let res = await f.json();
    if (res.success) {
      toast.success("Your Password has be changed", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      router.push(`${process.env.HOSTING_NAME}/myaccount`);
    } else {
      toast.error(res.error, {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="w-full py-3 px-6 ">
      <form className="w-[90%]" method="POST">
        <h4 className="text-gray-700 font-bold text-2xl select-none mb-2">
          Change Details
        </h4>
        <div className="flex flex-col md:flex-row items-center w-[90%] gap-x-3 md:gap-x-3">
          <input
            type="text"
            required
            placeholder="Name"
            className="mb-3 block px-2.5 py-4 w-full text-sm text-gray-900 bg-gray-50 rounded-md border outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete={"off"}
          />
          <div className="flex flex-col items-start w-full -translate-y-[16px]">
            <label
              htmlFor="email"
              className="form-label inline-block mb-1 text-red-700 select-none"
            >
              * Email cannot be Change
            </label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              readOnly
              disabled
              className="mb-3 block px-2.5 py-4 w-full text-sm text-gray-900 bg-gray-50 rounded-md border outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 select-none opacity-70"
              name="email"
              value={email}
              autoComplete={"off"}
            />
          </div>
        </div>

        <textarea
          id="message"
          rows="4"
          className="block p-2.5 w-[90%] text-sm text-gray-900 bg-gray-50 rounded-lg border outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3"
          placeholder="Your Address..."
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          autoComplete={"off"}
        ></textarea>

        <div className="flex flex-col md:flex-row items-center w-[90%] gap-x-3 md:gap-x-3">
          <input
            type="tel"
            placeholder="Phone Number"
            required
            className="mb-3 block px-2.5 py-4 w-full text-sm text-gray-900 bg-gray-50 rounded-md border outline-none border-gray-300 focus:ring-blue-50 0 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="phonenumber"
            value={phonenumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            autoComplete={"off"}
          />
          <input
            type="tel"
            placeholder="PinCode"
            required
            className="mb-3 block px-2.5 py-4 w-full text-sm text-gray-900 bg-gray-50 rounded-md border outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="pincode"
            value={pincode}
            onChange={(e) => setPinCode(e.target.value)}
            autoComplete={"off"}
          />
        </div>
        <button
          type="submit"
          className="w-[150px] font-bold bg-[#1a1818] text-white mt-4 py-[10px] rounded-md ease-in transition-opacity hover:opacity-80 select-none"
          onClick={UPDATE_USER_DETAILS}
        >
          Change Details
        </button>
      </form>

      {/* password */}
      <form className="w-[90%] mt-7" method="POST">
        <h4 className="text-gray-700 font-bold text-2xl select-none mb-2">
          Change Password
        </h4>
        <input
          type="password"
          placeholder="Your old password"
          className="mb-3 block px-2.5 py-4 w-[70%] text-sm text-gray-900 bg-gray-50 rounded-md border outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          autoComplete={"off"}
        />

        <div className="flex flex-col md:flex-row items-center w-[90%] gap-x-3 md:gap-x-3">
          <input
            type="password"
            placeholder="New Password"
            className="mb-3 block px-2.5 py-4 w-full text-sm text-gray-900 bg-gray-50 rounded-md border outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="newpassword"
            value={newpassword}
            onChange={(e) => setnewpassword(e.target.value)}
            autoComplete={"off"}
          />
          <input
            type="password"
            placeholder="confirm New Password"
            className="mb-3 block px-2.5 py-4 w-full text-sm text-gray-900 bg-gray-50 rounded-md border outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="cnewpassword"
            value={cnewpassword}
            onChange={(e) => setCnewPassword(e.target.value)}
            autoComplete={"off"}
          />
        </div>

        <button
          type="submit"
          className={`w-[150px] font-bold bg-[#1a1818] text-white mt-4 py-[10px] rounded-md ease-in transition-opacity hover:opacity-80 select-none ${
            changePassHideBtn && "pointer-events-none opacity-60"
          }`}
          onClick={UPDATE_PASSWORD}
        >
          Change Password
        </button>
      </form>
      <ToastContainer
        position="bottom-left"
        autoClose={1000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </div>
  );
};

export default Myaccount;
