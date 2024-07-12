import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase1";
import BookCard from "../components/Card";


const OrdersPage = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  

  useEffect(() => {
    const fetchBooks = async () => {
      if (firebase.isLoggedIn && firebase.user) {
        try {
          
          const booksSnapshot = await firebase.fetchMyBooks(firebase.user.uid);
          const booksData = booksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          // console.log("Fetched Books: ", booksData); // Debugging statement
          setBooks(booksData);
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      }
      setLoading(false); // Set loading to false after attempting to fetch books
    }
    fetchBooks();
  }, [firebase, firebase.user]);;

  if (!firebase.isLoggedIn) return <div className="flex justify-center place-content-center">
      <h1 >Error-404 <br/> Please log in</h1>;
      </div>

  if (loading) return <h1>Loading...</h1>; // Show loading message while fetching books


  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "25px", justifyContent: "center" }}>
      {books.map((book) => (
        <BookCard
        key={book.id}
        link={`/books/orders/${book.id}`}
        id={book.id}
        name={book.name}
        price={book.price}
        imageURL={book.imageURL}
        displayName={book.displayName}
      />
      ))}
    </div>
  );
};

export default OrdersPage;

