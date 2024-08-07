import React from "react";
import Login from "../components/Login";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase1";
import photo from "../assests/logo.jpg";

export const Loginpage = () => {
  const navigate = useNavigate();
  const firebase = useFirebase();

  const {logout, isLoggedIn} = useFirebase();

  if(isLoggedIn){
    navigate('/home');
  }
  
  const handleLoginSubmit = async (email, pass) => {
    const userCredential = await firebase.signinwithemail(email, pass);
    // if (userCredential) {
    //   toast.success("Login successful!");
    //   navigate("/");
    // } else {
    //   toast.error("Email address and password may be incorrect or the user does not exist. Please sign up first.");
    // }
    if(userCredential){navigate('/home')}
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

      <div className=" m-auto outline xl:block hidden outline-gray-500">
        <img className="w-80 h-80 mt-50px" src={photo} alt="logo"/>
        
      </div>
      <div>
        <h1 className="text-5xl text-left my-3  font-bold ">login</h1>
        <div className="my-auto">
          <Login onenter={handleLoginSubmit} role="login" />
        </div>
      </div>
    </div>
  );
};
