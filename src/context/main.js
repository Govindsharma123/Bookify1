import {
  getAuth,
  PhoneAuthCredential,
  signinwithphoneAndOtp,
  sendPasswordResetEmail,
  RecaptchaVerifier,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  sendPhoneVerification,
  signInWithPhoneNumber
} from "firebase/auth";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";

const firebaseConfig = {
  apiKey: "AIzaSyCwAiZP9tPH-vdFkdZlnSsA9cF-Oa-JHbs",
  authDomain: "bookify-6a80a.firebaseapp.com",
  projectId: "bookify-6a80a",
  storageBucket: "bookify-6a80a.appspot.com",
  messagingSenderId: "1081297312991",
  appId: "1:1081297312991:web:6d2204ca5b719bf65a5d6a"
};

//initialise firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);




export const signinWithGoogle = async() => {
  var provider = new GoogleAuthProvider();
  try{
    const data = await signInWithPopup(firebaseAuth,provider);
    return data;
  }
  catch(err){
    console.log(err);
  }
};

export const signinwithphone = async(PhoneInput )=>{
  try{
    const data = await signInWithPhoneNumber(firebaseAuth,PhoneInput);
    return data;
  }
  catch(err){
    console.log(err);
  }
};

export const signupwithphone = async (email, pass) => {
  try {
    const { error, res } = await PhoneAuthCredential
    (
      firebaseAuth,
      PhoneInput
    );

    if (res) {
      await RecaptchaVerifier(res.user);
      toast.error("invaild email id");
    }
    return res;
  } catch (err) {
    console.error(err.code);
    if (err.code === "auth//phone-already-in-use") {
      toast.error(
        "This phone number is already in use , please use different phone number"
      );
    } else if (err.code === "auth/invalid-phone")
      toast.error("invalid phone or Otp");
  }
};

export {firebaseAuth, firebaseApp, firestore,storage};