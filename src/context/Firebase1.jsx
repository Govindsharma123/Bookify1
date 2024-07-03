import { createContext, useContext, useState, useEffect,useCallback } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  onAuthStateChanged
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
  // updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FirebaseContext = createContext(null);


const firebaseConfig = {
  apiKey: "AIzaSyCwAiZP9tPH-vdFkdZlnSsA9cF-Oa-JHbs",
  authDomain: "bookify-6a80a.firebaseapp.com",
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

  useEffect(() => {
    onAuthStateChanged(auth, (user)=>{
      if(user) setUser(user);
      else setUser(null);
    })
  }, []);

  
const signupwithemail = async (email, pass) => {
  try {
    const { error, res } = await createUserWithEmailAndPassword(
      auth,
      email,
      pass
    );

    if (res) {
      await sendEmailVerification(res.user);
      toast.error("invaild email id");
    }
    return res;
  } catch (err) {
    console.error(err.code);
    if (err.code === "auth/email-already-in-use") {
      toast.error(
        "This email id is already in use , please use different email id"
      );
    } else if (err.code === "auth/invalid-email")
      toast.error("invalid email id or passwaord");
  }
};

const signinwithemail = async (email, pass) => {
  try {
    const data = await signInWithEmailAndPassword(auth, email, pass);
    return data;
  } catch (err) {
    console.error(err);
  }
};

const navigate = useNavigate();
const signinWithGoogle = async() => {
  
  try{
    const data = await signInWithPopup(auth,googleProvider);
    return data;
    
  }
  catch(err){
    console.log(err);
  }
  navigate('/books');
};
// // Logout function
// const [userLoggedIn, setUserLoggedIn] = useState(isLoggedIn());
// const logout = async () => {
//   try {
//     await signOut(auth);
//   } catch (err) {
//     console.error("Logout error:", err);
//     throw err;
//   }
// };
// useEffect(() => {
//   const unsubscribe = auth.onAuthStateChanged((user) => {
//     setUserLoggedIn(!!user);
//   });

//   return () => unsubscribe(); // Cleanup function
// }, []);

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

const placeOrder = async (bookId, qty) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("User not authenticated.");
    }
  const collectionRef = collection(firestore, "books", bookId, "orders");
  const result = await addDoc(collectionRef, {
    userID: currentUser.uid,
    userEmail: currentUser.email,
    displayName: currentUser.displayName,
    photoURL: currentUser.photoURL,
    qty: Number(qty),
  });
  console.log("Order placed successfully:", result.id);
  return result;
}
catch (error) {
  console.error("Error placing order:", error);
  throw error;
}};

const fetchMyBooks = async (uid) => {
 
  try {
    if (!uid) {
      throw new Error("User ID is undefined.");
    }
    const booksCollectionRef = collection(firestore, "books");
    const q = query(booksCollectionRef, where("userID", "==", uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  } catch (err) {
    console.error("Error fetching user's books:", err);
    throw err;
  }
};


const getOrders = async (bookId) => {
  const collectionRef = collection(firestore, "books", bookId, "orders");
  const result = await getDocs(collectionRef);
  return result;
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
      placeOrder,
      fetchMyBooks,
      getOrders,
      // logout,
    
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