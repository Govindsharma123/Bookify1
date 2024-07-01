// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";

// import { useFirebase } from "../context/Firebase";

// const RegisterPage = () => {
//   const firebase = useFirebase();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (firebase.isLoggedIn) {
//       // navigate to home
//       navigate("/");
//     }
//   }, [firebase, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("Signing up a user...");
//       const result = await firebase.signupUserWithEmailAndPassword(email, password);
//       console.log("Successfully registered", result);
//       navigate("/login"); // Redirect to login page after successful registration
//     } catch (error) {
//       setError(error.message); // Handle registration errors
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3" controlId="formBasicEmail">
//           <Form.Label>Email address</Form.Label>
//           <Form.Control
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             type="email"
//             placeholder="Enter email"
//           />
//           <Form.Text className="text-muted">
//             We'll never share your email with anyone else.
//           </Form.Text>
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formBasicPassword">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             type="password"
//             placeholder="Password"
//           />
//         </Form.Group>

//         <Button variant="primary" type="submit">
//           Create Account
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default RegisterPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { firebaseAuth,signinWithGoogle } from "../context/main";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Button } from "react-bootstrap";
import { TextField } from "@mui/material";
import { RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";



  const RegisterPage = () => {
    const firebase = useFirebase();
   

    const [phone, setPhone] = useState("");
    const [man, setMan] = useState(null);
    const [otp, setOtp] = useState("")
    const navigate = useNavigate();
  
   const sendOtp = async()=>{
    try{
      const recaptcha = new RecaptchaVerifier('recaptcha', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow send OTP
        }
      }, firebaseAuth);
      await recaptcha.render();
      const confirmation = await signInWithPhoneNumber(firebaseAuth, phone, recaptcha)
      setMan(confirmation)
    }
    catch(err){
      console.log(err)
    }
   }

   const verifyOtp = async()=>{
    try{
      await man.confirm(otp)
      navigate("/");
    }catch(err){
      console.log(err)
    }
   }

  

  const handelgooglesignup = async () => {
    const data = await signinWithGoogle();
    navigate("/");
    
  };

  // useEffect(() => {
  //   const unsubscribe = firebaseAuth.onAuthStateChanged(() => {
  //     firebaseAuth.currentUser && navigate("/home");
  //   });

  //   return () => unsubscribe();
  // }, []);


  return (
    <section className="flex post flex-col sm:w-3/4  p-4 w-full">
      <h3 className="text-3xl my-2 font-bold "> Sign up </h3>
      <div className="container mt-5">

    
       
      
      <PhoneInput
          country={"us"}
          value={phone}
          className="px-3  text-xl p-2 border-1 border-black rounded-lg my-2 border text-black  "
          onChange={(phone) => setPhone("+" + phone)}
          required
      ></PhoneInput>
        <br/>
      <Button onClick={sendOtp} variant="contained" sx ={{marginTop:"10px"}}>Send OTP</Button>
      <div id="recaptcha"></div>
      <br/>
      <TextField onChange={(e)=>setOtp(e.target.value)} mt-10px variant="outlined" size="small" label="Enter OTP"></TextField><br/>
      <Button onClick={verifyOtp} variant="contained" sx={{marginTop:"10px"}}color="success">Verify OTP</Button><br/>

        {/* <button type="submit" className="rounded-2xl w-80 my-4 text-xl p-1 capitalize bg-sky-600  m-auto hover:scale-105 transition-all ease" onClick={handelsubmit}>
          Login
        </button> */}
      
      <h1 className="mt-5 mb-5 ">OR</h1>

      <div className=" my-5 sm: bg-white text-black text-center hover:scale-105 transition-all ease font-semibold outline rounded-2xl ">
          <button
          className="m-auto capitalize flex p-2 px-6 text-base sm:text-xl "
          onClick={handelgooglesignup}
          >
          {/* <i className="mx-2">
            <GoogleIcon />{" "}
          </i> */}
          sign-up with Google
          </button>
      </div>

      
      

        <label className="my-3">Already have an account ? </label>
        <h3 className="text-3xl my-2 font-bold "> Login </h3>

      <div className=" my-5 sm: bg-white text-black text-center hover:scale-105 transition-all ease font-semibold outline rounded-2xl ">
      
        <div className="my-2  capitalize text-base sm:text-xl flex flex-col ">
          
          <button
          className="m-auto capitalize flex p-2 px-6 text-base sm:text-xl "
          onClick={handelgooglesignup}
          >
          <i className="mx-2">
            {/* <GoogleIcon />{" "} */}
          </i>
          sign-in with Google
          </button>
        </div>
        
      </div>


    </div>

    </section>
      );
};

export default RegisterPage;


