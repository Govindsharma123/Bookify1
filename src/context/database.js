// import { auth, firestore, storage } from "./main";
// import {

//   collection,
//   addDoc,
//   getDocs,
//   getDoc,
//   doc,
//   query,
//   where,
//   updateDoc,
// } from "firebase/firestore";

// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { toast } from "react-toastify";
// import { useFirebase } from "./Firebase";


// const user = collection(firestore, "user");
// console.log(user)

// export const Create_Account = async({
//   email,
//   uid,
//   bio,
//   name,
//   age,
//   username,
//   profileimg,
// })=>{
//   try{
//     await addDoc(user, {
//       email: email,
//       name: name,
//       uid: uid,
//       dateofbirth: age,
//       bio: bio,
//       report: [],
//       restricted: false,
//       privacy: false,
//       profileImageURL: profileimg,
//       notification: 0,
//       createdAt: new Date(),
//       follower: [],
//       following: [],
//       blockusers: [],
//       saved: [],
//       username: username,
//       post: [],
//     });
//   } catch (err) {
//     console.error(err);
//   }
// }


// // export const Create_notification = async (uid, intent) => {
// //   try {
// //     await addDoc(collection(firestore, "notification"), {
// //       uid: uid,
// //       intent: intent,
// //       time: new Date(),
// //     });
// //   } catch (err) {
// //     console.error(err);
// //   }
// // };


// export const get_user_data1 = async () => {
//   try {
//     let user = auth.currentUser;
    
//     if (user) {
//       // User is signed in
//       const { uid, displayName, email } = user;
//       console.log(user)
//       return { uid, displayName, email };
//     } else {
//       // No user is signed in
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     throw error;
//   }
// };

// export const get_userdatabyname = async (username) => {
//   try {
//     console.log(username)
//     const q =  query(user, where("username", "==", username.trim()));
//     const doc_refs = await getDocs(q);
//     const res = [];
//     doc_refs.forEach((country) => {
//       res.push({
//         ...country.data(),
//       });
//     });
//     return res[0];
//   } catch (err) {
//     console.error("Error fetching user data by name:", err);
//     throw err;
//   }
// };

// export const updateuserdata = async (userdata) => {
//   try {
//     const q =  query(user, where("uid", "==", auth.currentUser.uid));
//     const doc_refs = await getDocs(q);
//     var docid;
//     doc_refs.forEach((snapshot) => {
//       docid = snapshot.id;
//     });

//     await updateDoc(doc(firestore, `user/${docid}`), userdata);
//   } catch (err) {
//     console.error(err);
//   }
// };

// export const check_data_is_exist = async (uid) => {
//   try {
//     const data = await get_user_data1(uid);
//     return !!data;
//   } catch (err) {
//     console.error(err);
//   }
// };
// export const check_username_is_exist = async (username) => {
//   try {
//     return await get_userdatabyname(username);
//   } catch (err) {
//     console.error("Error checking if username exists:", err);
//     throw err;
//   }
// };

// export const listAllBooks = () => {
//   return getDocs(collection(firestore, "books"));
// };

// export const getBookById = async (id) => {
//   try {
//     const docRef = doc(firestore, "books", id);
//     const docSnapshot = await getDoc(docRef);
//     if (docSnapshot.exists()) {
//       return { id: docSnapshot.id, ...docSnapshot.data() };
//     } else {
//       throw new Error("Book not found");
//     }
//   } catch (err) {
//     console.error("Error fetching book by ID:", err);
//     throw err;
//   }
// };

// export const getImageURL = (path) => {
//   return getDownloadURL(ref(storage, path));
// };

// export const placeOrder = async (bookId, qty) => {
//   try {
//     const currentUser = auth.currentUser;
//     if (!currentUser) {
//       throw new Error("User not authenticated.");
//     }
//   const collectionRef = collection(firestore, "books", bookId, "orders");
//   const result = await addDoc(collectionRef, {
//     userID: currentUser.uid,
//     userEmail: currentUser.email,
//     displayName: currentUser.displayName,
//     photoURL: currentUser.photoURL,
//     qty: Number(qty),
//   });
//   console.log("Order placed successfully:", result.id);
//   return result;
// }
// catch (error) {
//   console.error("Error placing order:", error);
//   throw error;
// }};

// export const fetchMyBooks = async (uid) => {
 
//   try {
//     if (!uid) {
//       throw new Error("User ID is undefined.");
//     }
//     const booksCollectionRef = collection(firestore, "books");
//     const q = query(booksCollectionRef, where("userID", "==", uid));
//     const querySnapshot = await getDocs(q);
//     return querySnapshot;
//   } catch (err) {
//     console.error("Error fetching user's books:", err);
//     throw err;
//   }
// };


// export const getOrders = async (bookId) => {
//   const collectionRef = collection(firestore, "books", bookId, "orders");
//   const result = await getDocs(collectionRef);
//   return result;
// };



// export const handleCreateNewListing = async (name, isbn, price, cover) => {
//   auth.currentUser

//   console.log(userdata.displayName);
//   const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
//   const uploadResult = await uploadBytes(imageRef, cover);
//   const newBook = {
//     name,
//     isbn,
//     price,
//     imageURL: uploadResult.ref.fullPath,
//     userID: userdata.uid,
//     userEmail:userdata.email,
//     displayName: userdata.displayName,
    
//     photoURL:userdata.photoURL,
//   };
  
  
//   await addDoc(collection(firestore, "books"), newBook);
//     console.log("Book added successfully:", newBook);
//     return newBook;
// };