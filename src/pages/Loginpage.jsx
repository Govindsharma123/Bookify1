import React from "react";
import Login from "../components/Login";
import { Helmet } from "react-helmet";
// import { signinwithemail } from "../context/main";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase1";
import { toast } from "react-toastify";


export const Loginpage = () => {
  const navigate = useNavigate();
  const firebase = useFirebase();
  
  const handelsubmit = async (email, pass) => {
    const data = await firebase.signinwithemail(email, pass);
    data && toast.success("login successfully ");
    data && navigate("/");
    !data && toast.error("Email adrress and password may be incorrect");
  };

  return (
    <div className="w-full post sm:mt-5 flex p-2 capitalize">
      <Helmet>
        <title>login | Book-Bank</title>
        <meta name="description" content="login" />
        <link rel="canonical" href="/login" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="login" />
        <meta name="author" content="login" />
        <meta name="language" content="EN" />
      </Helmet>

      <div className=" m-auto outline xl:block hidden outline-gray-900">
        <img className="w-80 h-80 mt-50px"  src="/images/webLogo.jpg" alt="logo"/>
        {/* <iframe
    className="w-80"
    src="https://via.placeholder.com/150.png?text=Book+Bank+Logo"
    alt="BOOK BANK logo"
    style={{ border: 'none' }}
  >Book-Bank</iframe> */}
      </div>
      <div>
        <h1 className="text-5xl text-left my-3  font-bold ">login</h1>
        <div className="my-auto">
          <Login onenter={handelsubmit} role="login" />
        </div>
      </div>
    </div>
  );
};
