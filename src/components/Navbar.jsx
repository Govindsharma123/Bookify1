import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

<<<<<<< HEAD

const MyNavbar = () => {

  const firebase = useFirebase();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log(firebase.isLoggedIn)
    setIsLoggedIn(firebase.isLoggedIn);
  }, [firebase.isLoggedIn]);

=======
const MyNavbar = () => {
  const { isLoggedIn, logout } = useFirebase();
  const navigate = useNavigate();

<<<<<<< HEAD
  const [isLoggedIn, setIsLoggedIn] = useState(null); // initialize with null

  const checkLoginStatus = async () => {
    const userLoggedIn = await firebase.isLoggedIn();
    setIsLoggedIn(userLoggedIn);
  };

  useEffect(() => {
    checkLoginStatus(); // check login status when component mounts
  }, []);
>>>>>>> b20431f (hello)

=======
>>>>>>> d8bdad8 (hel)
  const handleLogout = async () => {
    try {
      await logout(); // Logout using Firebase method
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark">
<<<<<<< HEAD
<<<<<<< HEAD
      <Container style={{ display: 'flex', justifyContent: 'space-between' }}>
        
        {/* <Nav className="me-auto"> */}
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/book/list">Add Listing</Nav.Link>
          <Nav.Link href="/book/orders">Orders</Nav.Link>
          {/* </Nav> */}
          <Nav className="ms-auto">
          {isLoggedIn ? (
=======
      <Container  style={{ display: 'flex', justifyContent: 'space-between' }}>
=======
      <Container style={{ display: 'flex', justifyContent: 'pace-between' }}>
>>>>>>> d8bdad8 (hel)
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/book/list">Add Listing</Nav.Link>
          <Nav.Link href="/book/mybooks">My Books</Nav.Link>
        </Nav>

<<<<<<< HEAD
        
//           <Nav className="ms-auto">
//           {isLoggedIn ? (
>>>>>>> b20431f (hello)
            // Show Logout button if logged in
            <button className="btn btn-light" onClick={handleLogout}>Logout</button>
          ) : (
            // Show Login and SignUp links if not logged in
            <>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">SignUp</Nav.Link>
            </>
          )}
        </Nav>
<<<<<<< HEAD
        
=======

>>>>>>> b20431f (hello)
=======
        {isLoggedIn? (
          // Show Logout button if logged in
          <button className="btn btn-light" onClick={handleLogout}>Logout</button>
        ) : (
          // Show Login and SignUp links if not logged in
          <>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">SignUp</Nav.Link>
          </>
        )}
>>>>>>> d8bdad8 (hel)
      </Container>
    </Navbar>
  );
};

<<<<<<< HEAD
export default MyNavbar;
<<<<<<< HEAD
=======





//   return (
//     <Navbar bg="dark" variant="dark">
//       <Container>
        
//         {/* <Nav className="me-auto"> */}
//           <Nav.Link href="/">Home</Nav.Link>
//           <Nav.Link href="/book/list">Add Listing</Nav.Link>
//           <Nav.Link href="/book/orders">Orders</Nav.Link>
//           
        
//       </Container>
//     </Navbar>
//   );
// };
>>>>>>> b20431f (hello)
=======
const MemoizedMyNavbar = React.memo(MyNavbar);

export default MyNavbar;
>>>>>>> d8bdad8 (hel)
