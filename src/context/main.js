// import {
//   getAuth,
//   sendPasswordResetEmail,
//   GoogleAuthProvider,
//   signInWithPopup,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   sendEmailVerification,
//   signOut
// } from "firebase/auth";

// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import { toast } from "react-toastify";


// const firebaseConfig = {
//   apiKey: "AIzaSyCwAiZP9tPH-vdFkdZlnSsA9cF-Oa-JHbs",
//   authDomain: "bookify-6a80a.firebaseapp.com",
//   projectId: "bookify-6a80a",
//   storageBucket: "bookify-6a80a.appspot.com",
//   messagingSenderId: "1081297312991",
//   appId: "1:1081297312991:web:6d2204ca5b719bf65a5d6a"
// };

// //initialise firebase
// const firebaseApp = initializeApp(firebaseConfig);
// const auth = getAuth(firebaseApp);

// const firestore = getFirestore(firebaseApp);
// const storage = getStorage(firebaseApp);




// export const signinWithGoogle = async() => {
//   var provider = new GoogleAuthProvider();
//   try{
//     const data = await signInWithPopup(auth,provider);
//     return data;
//   }
//   catch(err){
//     console.log(err);
//   }
// };
// // export const isLoggedIn = () => !!auth.currentUser;

// export const signinwithemail = async (email, pass) => {
//   try {
//     const data = await signInWithEmailAndPassword(auth, email, pass);
//     return data;
//   } catch (err) {
//     console.error(err);
//   }
// };

// export const signupwithemail = async (email, pass) => {
//   try {
//     const { error, res } = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       pass
//     );

//     if (res) {
//       await sendEmailVerification(res.user);
//       toast.error("invaild email id");
//     }
//     return res;
//   } catch (err) {
//     console.error(err.code);
//     if (err.code === "auth/email-already-in-use") {
//       toast.error(
//         "This email id is already in use , please use different email id"
//       );
//     } else if (err.code === "auth/invalid-email")
//       toast.error("invalid email id or passwaord");
//   }
// };
// export const forget_password = async (email ) => {
//   try {
//     const data = await sendPasswordResetEmail(auth, email);
//     return data;
//   } catch (err) {
//     console.error(err);
//   }
// };

// //isLoggedIn function
// export const isLoggedIn = () => {
//   return !!auth.currentUser; // Check if user is logged in
// };


// // Logout function
// export const logout = async () => {
//   try {
//     await signOut(auth);
//   } catch (err) {
//     console.error("Logout error:", err);
//     throw err;
//   }
// };

// export {auth, firebaseApp, firestore,storage};