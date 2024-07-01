import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import BookCard from "../components/Card";


const OrdersPage = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      if (firebase.isLoggedIn) {
        
        try {
          const booksSnapshot = await firebase.fetchMyBooks(firebase.user.uid)
        
          ?.then(books)
          setBooks(booksSnapshot.docs); // Assuming fetchMyBooks returns a Firestore QuerySnapshot
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      }
    };

    fetchBooks();
  }, [firebase]);


  // console.log(books);

  if (!firebase.isLoggedIn) return <h1>Please log in</h1>;

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
