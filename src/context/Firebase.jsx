import { createContext, useContext, useState, useEffect,useCallback } from "react";

import { auth } from "./main";
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
  get_user_data1,
} from "./database";
import { toast } from "react-toastify";

export const UserDataContext = createContext();



export const useFirebase = () => useContext(UserDataContext);



// const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  const [userdata, setuserdata] = useState(auth.currentUser);

  useEffect(() => {
    const datalogin = async () => {
      auth.onAuthStateChanged(async (userdata) => {
        if (userdata) {
          let data=await get_user_data1()
          // let data = await get_userdata(userdata?.uid);
          if (data?.displayName) {
            setuserdata(data);
            // setvalue(data);
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
    <UserDataContext.Provider
      value={{
        isLoggedIn: () => !!auth.currentUser,
        
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
    </UserDataContext.Provider>
  );
};

export const useUserdatacontext = () => {
  const value = useContext(UserDataContext);
  return value;
};
