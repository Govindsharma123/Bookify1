import { createContext, useContext, useState, useEffect } from "react";

import { firebaseAuth } from "./main";
import { useNavigate } from "react-router-dom";
import {
  getBookById,
  getImageURL,
  getOrders,
  fetchMyBooks,
  listAllBooks,
  placeOrder,
  handleCreateNewListing,
  get_userdata,
  updateuserdata,
} from "./database";
import { toast } from "react-toastify";

export const FirebaseContext = createContext();



export const useFirebase = () => useContext(FirebaseContext);



// const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props,value,setvalue) => {
  const [userdata, setuserdata] = useState(firebaseAuth.currentUser);

  useEffect(() => {
    const datalogin = async () => {
      firebaseAuth.onAuthStateChanged(async (user) => {
        console.log(firebaseAuth);
        if (user) {
          let data = await get_userdata(user?.uid);
          if (data?.username) {
            setuserdata(data);
            setvalue(data);
          } //else {
          //   navigate("/register");
          // }
        }
      });
    };
    datalogin();
  }, []);

  useEffect(() => {
    const data = async () => {
      userdata && (await updateuserdata(userdata));
    };
    data();
  }, [userdata]);




  return (
    <FirebaseContext.Provider
      value={{
        handleCreateNewListing,
        listAllBooks,
        getImageURL,
        getBookById,
        placeOrder,
        fetchMyBooks,
        getOrders,
        
        
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
export const useFirebaseContext = () => {
  const value = useContext(FirebaseContext);
  return value;
};