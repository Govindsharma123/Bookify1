// import React, { useEffect, useState } from "react";
// import { useFirebase } from "../context/Firebase";
// import BookCard from "../components/Card";
// import { isLoggedIn } from "../context/main";


// const OrdersPage = () => {
//   const firebase = useFirebase();
//   const [books, setBooks] = useState([]);

//   // useEffect(() => {
//   //   const fetchBooks = async () => {
//   //     if (isLoggedIn) {
        
//   //       try {
//   //         const booksSnapshot = await firebase.fetchMyBooks(firebase.userdata.uid) 
          
          
//   //         setBooks(booksSnapshot.docs); // Assuming fetchMyBooks returns a Firestore QuerySnapshot
//   //         console.log("booksnapshot",booksSnapshot.docs)
//   //       } catch (error) {
//   //         console.error("Error fetching books:", error);
//   //       }
//   //     }
//   //   };

//   //   fetchBooks();
//   // }, [firebase]);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       if (isLoggedIn) {
//         console.log(firebase.userdata)
//         if (firebase.userdata && firebase.userdata.uid) {
//           try {
//             const booksSnapshot = await firebase.fetchMyBooks(firebase.userdata.uid);
//             const booksData = booksSnapshot.map(doc => ({ id: doc.id, ...doc.data() }));
//             setBooks(booksData);
//             console.log("booksData", booksData);
//           } catch (error) {
//             console.error("Error fetching books:", error);
//           }
//         } else {
//           console.error("User data or UID is not available");
//         }
//       }
//     };

//     fetchBooks();
//   }, [firebase]);




//   // if (!isLoggedIn) return <h1>Please log in</h1>;

//   return (
//     <div style={{ display: "flex", flexWrap: "wrap", gap: "25px", justifyContent: "center" }}>
//       {books.map((book) => (
        
//           <BookCard
//           link={`/books/orders/${book.id}`}
//           key={book.id}
//           id={book.id}
//           {...book.data()}
//         />
        
        
//       ))}
//     </div>
//   );
// };

// export default OrdersPage;



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

