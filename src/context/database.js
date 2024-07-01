import { auth, firestore, storage } from "./main";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";

const user = collection(firestore, "user");

export const Create_Account = async({
  email,
  uid,
  bio,
  name,
  age,
  username,
  profileimg,
})=>{
  try{
    await addDoc(user, {
      email: email,
      name: name,
      uid: uid,
      dateofbirth: age,
      bio: bio,
      report: [],
      restricted: false,
      privacy: false,
      profileImageURL: profileimg,
      notification: 0,
      createdAt: new Date(),
      follower: [],
      following: [],
      blockusers: [],
      saved: [],
      username: username,
      post: [],
    });
  } catch (err) {
    console.error(err);
  }
}

// export const Create_notification = async (uid, intent) => {
//   try {
//     await addDoc(collection(firestore, "notification"), {
//       uid: uid,
//       intent: intent,
//       time: new Date(),
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };

export const get_userdata = async (uid) => {
  try {
    const q = await query(user, where("uid", "==", uid));
    const doc_refs = await getDocs(q);
    const res = [];
    doc_refs.forEach((snapshot) => {
      res.push({
        ...snapshot.data(),
      });
    });
    return res[0];
  } catch (err) {
    console.error(err);
  }
};
export const get_user_data1 = async () => {
  try {
    let user = auth.currentUser;
    
    if (user) {
      // User is signed in
      const { uid, displayName, email } = user;
      return { uid, displayName, email };
    } else {
      // No user is signed in
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const get_userdatabyname = async (username) => {
  try {
    const q = await query(user, where("username", "==", username.trim()));
    const doc_refs = await getDocs(q);
    const res = [];
    doc_refs.forEach((country) => {
      res.push({
        ...country.data(),
      });
    });
    return res[0];
  } catch (err) {
    console.error(err);
  }
};

export const updateuserdata = async (userdata) => {
  try {
    const q = await query(user, where("uid", "==", auth.currentUser.uid));
    const doc_refs = await getDocs(q);
    var docid;
    doc_refs.forEach((snapshot) => {
      docid = snapshot.id;
    });

    await updateDoc(doc(firestore, `user/${docid}`), userdata);
  } catch (err) {
    console.error(err);
  }
};

export const check_data_is_exist = async (uid) => {
  try {
    const data = await get_userdata(uid);
    return !!data;
  } catch (err) {
    console.error(err);
  }
};
export const check_username_is_exist = async (username) => {
  try {
    return await get_userdatabyname(username);
  } catch (err) {
    console.error(err);
  }
};

export const listAllBooks = () => {
  return getDocs(collection(firestore, "books"));
};

export const getBookById = async (id) => {
  const docRef = doc(firestore, "books", id);
  const result = await getDoc(docRef);
  return result;
};

export const getImageURL = (path) => {
  return getDownloadURL(ref(storage, path));
};

export const placeOrder = async (bookId, qty) => {
  const collectionRef = collection(firestore, "books", bookId, "orders");
  const result = await addDoc(collectionRef, {
    userID: user.uid,
    userEmail: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    qty: Number(qty),
  });
  return result;
};

export const fetchMyBooks = async (userId) => {
  const collectionRef = collection(firestore, "books");
  const q = query(collectionRef, where("userID", "==", userId));

  const result = await getDocs(q);
  return result;
};

export const getOrders = async (bookId) => {
  const collectionRef = collection(firestore, "books", bookId, "orders");
  const result = await getDocs(collectionRef);
  return result;
};

export const handleCreateNewListing = async (name, isbn, price, cover) => {
  const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
  const uploadResult = await uploadBytes(imageRef, cover);
  return await addDoc(collection(firestore, "books"), {
    name,
    isbn,
    price,
    imageURL: uploadResult.ref.fullPath,
    userID: user.uid,
    userEmail: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  });
};