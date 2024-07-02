import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import BookCard from "../components/Card";
import { isLoggedIn } from "../context/main";


const OrdersPage = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      if (isLoggedIn) {
        
        try {
          console.log(firebase.userdata.uid)
          const booksSnapshot = await firebase.fetchMyBooks(firebase.userdata.uid) 
          console.log(booksSnapshot)
          
          setBooks(booksSnapshot.docs); // Assuming fetchMyBooks returns a Firestore QuerySnapshot
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      }
    };

    fetchBooks();
  }, [firebase]);
  

  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     if (isLoggedIn) {
  //        await firebase.fetchMyBooks(firebase.userdata.uid)
  //       console.log(firebase.userdata.uid)
  //         ?.then((books) => setBooks(books.docs)); 
  //       } 
  //     }
    

  //   fetchBooks();
  // }, [firebase]);




  // if (!isLoggedIn) return <h1>Please log in</h1>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "25px", justifyContent: "center" }}>
      {books.map((book) => (
        
          <BookCard
          link={`/books/orders/${book.id}`}
          key={book.id}
          id={book.id}
          {...book.data()}
        />
        
        
      ))}
    </div>
  );
};

export default OrdersPage;
