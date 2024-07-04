import React from "react";
// import { signupwithemail } from "../context/main";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase1";
import { Helmet } from "react-helmet";
import Login from "../components/Login";
import { toast } from "react-toastify";
import photo from '../assests/logo.jpg'
const Signuppage = () => {
  const navigate = useNavigate();
  const firebase = useFirebase();

  const handleSignupSubmit = async (email, pass) => {
    const userCredential = await firebase.signupwithemail(email, pass);
    if (userCredential) {
      toast.success("Signup successful! .");
      navigate("/");}
    // } else {
    //   toast.error("Signup failed. Please try again.");
      
    // }
  };

  return (
    <div className="w-full align-middle my-auto flex post sm:mt-5 p-2 capitalize">
      <Helmet>
        <title>Sign up | Book-Bank</title>
        <meta name="description" content="sign-up" />
        <link rel="canonical" href="/login" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="sign-up" />
        <meta name="author" content="sign-up" />
        <meta name="language" content="EN" />
      </Helmet>

      <div className=" m-auto outline xl:block hidden  outline-gray-900">
        <img
          className="w-80"
          src={photo}
          alt=""
        />
      </div>
      <div>
        <h1 className="text-5xl mx-1 text-left font-bold  ">happening now </h1>
        <Login onenter={handleSignupSubmit} role="signup" />
      </div>
    </div>
  );
};

export default Signuppage;
