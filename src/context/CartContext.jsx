import React, { createContext, useContext, useState, useEffect } from "react";
import { useFirebase } from "./Firebase1";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  collection,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  writeBatch
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const firebase = useFirebase();
  const auth = getAuth();
  const [cart, setCart] = useState([]);
  const firestore = getFirestore();
  const navigate = useNavigate();

  // Fetch cart from Firestore on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (auth.currentUser) {
          const cartCollectionRef = collection(firestore, `cart/${auth.currentUser.uid}/items`);
          const cartSnapshot = await getDocs(cartCollectionRef);

          // Log the entire cartSnapshot
          // console.log("cartSnapshot:", cartSnapshot);

          // Check if cartSnapshot is empty
          if (cartSnapshot.empty) {
            console.log("No documents found in cartSnapshot");
          } else {
            // Log each document in the snapshot
            // cartSnapshot.forEach(doc => {
            //   console.log("Document ID:", doc.id);
            //   console.log("Document data:", doc.data());
            // });

            const cartItems = cartSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Log the resulting cartItems array
            // console.log("cartItems:", cartItems);

            setCart(cartItems);
          }
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, [auth.currentUser, firestore]);

  const syncCartToFirestore = async (updatedCart) => {
    try {
      if (auth.currentUser) {
        const batch = writeBatch(firestore);
        const cartCollectionRef = collection(firestore, `cart/${auth.currentUser.uid}/items`);
        const cartDocs = await getDocs(cartCollectionRef);

        // Delete all existing cart items
        cartDocs.forEach(doc => {
          batch.delete(doc.ref);
        });

        // Add updated cart items
        updatedCart.forEach(item => {
          const cartItemRef = doc(cartCollectionRef, item.id);
          batch.set(cartItemRef, item);
        });

        await batch.commit();
      }
    } catch (error) {
      console.error("Error syncing cart to Firestore:", error);
    }
  };

  const placeOrder = async (bookId, qty=1) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error("User not authenticated.");
      }
    const collectionRef = collection(firestore, "books", bookId, "orders");
    console.log("collectionref",collectionRef)
    const result = await addDoc(collectionRef, {
      userID: currentUser.uid,
      userEmail: currentUser.email,
      displayName: currentUser.displayName,
      photoURL: currentUser.photoURL,
      qty: Number(qty),
    });
    console.log("Order placed successfully:", result);
    navigate('/books')
    toast.success("order placed successfully")
    return result;
  }
  catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }};

  const addToCart = async (book) => {
    try {
      const imageURL = await firebase.getImageURL(book.imageURL);
      const cartItem = { ...book, fetchedImageURL: imageURL };
      console.log(cartItem);

      // Add cart item to Firestore with a unique ID
      const cartCollectionRef = collection(firestore, `cart/${auth.currentUser.uid}/items`);
      await addDoc(cartCollectionRef, cartItem);
      console.log("bhai ye add kiya h",cartCollectionRef)
      // Update local state
      const updatedCart = [...cart, cartItem];
      setCart(updatedCart);

      // Sync updated cart to Firestore
      await syncCartToFirestore(updatedCart);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (id) => {
    try {
      // Remove cart item from Firestore subcollection
      const cartItemRef = doc(firestore, `cart/${auth.currentUser.uid}/items`, id);
      await deleteDoc(cartItemRef);
      toast.error("book removed from cart")
      // Update local state
      const updatedCart = cart.filter((item) => item.id !== id);
      setCart(updatedCart);
  
      // Sync updated cart to Firestore
      await syncCartToFirestore(updatedCart);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };
  
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart,placeOrder }}>
      {children}
    </CartContext.Provider>
  );
};
