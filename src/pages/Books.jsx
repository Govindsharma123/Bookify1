import React, { useEffect, useState } from "react";
import CardGroup from "react-bootstrap/CardGroup";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/Card";
import { useFirebase } from "../context/Firebase1";

const BookPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    firebase.listAllBooks().then((books) => setBooks(books.docs));
  }, []);
  
  if (!firebase.isLoggedIn) return <div className="flex justify-center place-content-center">
  <h1 >Error-404 <br/> Please log in</h1>;
  </div>
      
  return (
    <div className="container mt-5">
      <CardGroup>
        {books.map((book) => (
          <BookCard
            link={`/book/view/${book.id}`}  
            key={book.id}
            id={book.id}
            {...book.data()}
          />
        ))}
      </CardGroup>
    </div>
  );
};


export default BookPage;
