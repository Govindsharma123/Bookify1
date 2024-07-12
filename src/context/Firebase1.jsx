import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  deleteDoc
  // updateDoc,
} from "firebase/firestore";

import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from "firebase/storage";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FirebaseContext = createContext(null);


const firebaseConfig = {
  apiKey: "AIzaSyCwAiZP9tPH-vdFkdZlnSsA9cF-Oa-JHbs",
  authDomain: "bookify-6a80a.firebaseapp.com",
  databaseURL : "https://bookify-6a80a-default-rtdb.firebaseio.com",
  projectId: "bookify-6a80a",
  storageBucket: "bookify-6a80a.appspot.com",
  messagingSenderId: "1081297312991",
  appId: "1:1081297312991:web:6d2204ca5b719bf65a5d6a"
};

export const useFirebase = () => useContext(FirebaseContext);

//initialise firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);


const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user)=>{
      if(user) setUser(user);
      else setUser(null);
    })
  }, []);

  
  const signupwithemail = async (email, pass) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      const user = userCredential.user;
      await sendEmailVerification(user);
      toast.success("Signup successful! ");
      return userCredential;
    } catch (err) {
      console.error(err.code);
      if (err.code === "auth/email-already-in-use") {
        toast.error("This email id is already in use. Please use a different email id.");
      } else if (err.code === "auth/invalid-email") {
        toast.error("Invalid email id or password.");
      }
      return null;
    }
  };

const signinwithemail = async (email, pass) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    toast.success('Login successful')
    return userCredential;
  }  catch (err) {
    console.error(err);
    // switch (err.code) {
    //   case "auth/user-not-found":
    //     toast.error("User not found. Please sign up first.");
    //     break;
    //   case "auth/wrong-password":
    //     toast.error("Incorrect password. Please try again.");
    //     break;
    //   case "auth/invalid-email":
    //     toast.error("Invalid email address. Please check your email.");
    //     break;
    //   default:
        toast.error("Something went wrong, please check your Email and Password again.");
    
    return null;
  }
};

const navigate = useNavigate();

const signinWithGoogle = async () => {
  try {
    const data = await signInWithPopup(auth, googleProvider);
    toast.success('sign-in successful')
    navigate('/home')
    return data;
    
  } catch (err) {
    console.error(err);
      toast.error("Error during Google sign-in. Please try again.");
  }
};
// // Logout function
const logOut = async () => {
  try {
    await signOut(auth);
    setUser(null); // Clear user state
    toast.error('logout successful')
    navigate('/'); // Redirect to  login page
  } catch (err) {
    console.error("Logout error:", err);
    throw err;
  }
};

const listAllBooks = () => {
  return getDocs(collection(firestore, "books"));
};

const getBookById = async (id) => {
  try {
    const docRef = doc(firestore, "books", id);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      return { id: docSnapshot.id, ...docSnapshot.data() };
    } else {
      throw new Error("Book not found");
    }
  } catch (err) {
    console.error("Error fetching book by ID:", err);
    throw err;
  }
};

const getImageURL = (path) => {
  return getDownloadURL(ref(storage, path));
};

// const placeOrder = async (bookId, qty=1) => {
//   try {
//     const currentUser = auth.currentUser;
//     if (!currentUser) {
//       throw new Error("User not authenticated.");
//     }
//   const collectionRef = collection(firestore, "books", bookId, "orders");
//   console.log("collectionref",collectionRef)
//   const result = await addDoc(collectionRef, {
//     userID: currentUser.uid,
//     userEmail: currentUser.email,
//     displayName: currentUser.displayName,
//     photoURL: currentUser.photoURL,
//     qty: Number(qty),
//   });
//   console.log("Order placed successfully:", result);
//   return result;
// }
// catch (error) {
//   console.error("Error placing order:", error);
//   throw error;
// }};




const fetchMyBooks = async (userId) => {
 
  try {
    if (!userId) {
      throw new Error("User ID is undefined.");
    }
    const booksCollectionRef = collection(firestore, "books");
    const q = query(booksCollectionRef, where("userID", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  } catch (err) {
    console.error("Error fetching user's books:", err);
    throw err;
  }
};


const getOrders = async (bookId) => {
  try {
    const q = query(collection(firestore, "books", bookId, "orders"));
    const ordersSnapshot = await getDocs(q);

    return ordersSnapshot; // Return the QuerySnapshot
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};


const handleCreateNewListing = async (name, isbn, price, cover) => {

  const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
  const uploadResult = await uploadBytes(imageRef, cover);
  const newBook = {
    name,
    isbn,
    price,
    imageURL: uploadResult.ref.fullPath,
    userID: user.uid,
    userEmail:user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
  
  
  await addDoc(collection(firestore, "books"), newBook);
    console.log("Book added successfully:", newBook);
    return newBook;
};



const isLoggedIn = user ? true : false;

return (
  <FirebaseContext.Provider
    value={{
      signinWithGoogle,
      signupwithemail,
      signinwithemail,
      isLoggedIn,
      handleCreateNewListing,
      listAllBooks,
      getImageURL,
      getBookById,
      // placeOrder,
      fetchMyBooks,
      getOrders,
      user,
      logOut,
      
    
    }}
  >
    {props.children}
  </FirebaseContext.Provider>
);
}

export const useFirebasecontext = () => {
  const value = useContext(FirebaseContext);
  return value;
};
export default firebaseApp;