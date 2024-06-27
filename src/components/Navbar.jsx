import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useFirebase } from "../Firebase";
import { useNavigate } from "react-router-dom";


const MyNavbar = () => {

  const firebase = useFirebase();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log(firebase.isLoggedIn)
    setIsLoggedIn(firebase.isLoggedIn);
  }, [firebase.isLoggedIn]);


  const handleLogout = async () => {
    try {
      await firebase.logout(); // Logout using Firebase method
      setIsLoggedIn(false); // Update isLoggedIn state after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container style={{ display: 'flex', justifyContent: 'space-between' }}>
        
        {/* <Nav className="me-auto"> */}
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/book/list">Add Listing</Nav.Link>
          <Nav.Link href="/book/orders">Orders</Nav.Link>
          {/* </Nav> */}
          <Nav className="ms-auto">
          {isLoggedIn ? (
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
        
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
