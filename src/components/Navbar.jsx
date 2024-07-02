// Navbar.jsx
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import { auth } from "../context/main";
import { isLoggedIn, logout } from "../context/main";

const MyNavbar = () => {
  // const { isLoggedIn, logout } = useFirebase();
  const navigate = useNavigate();
  const [userLoggedIn, setUserLoggedIn] = useState(isLoggedIn()); // Initial state based on isLoggedIn

  
  
  

  const handleLogout = async () => {
    try {
      await logout();
      
      setUserLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserLoggedIn(!!user);
    });

    return () => unsubscribe(); // Cleanup function
  }, []);

  return (
    <Navbar bg="dark" variant="dark">
      <Container style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Nav className="me-auto">
          <Nav.Link href="/books">Books</Nav.Link>
          <Nav.Link href="/book/list">List Book</Nav.Link>
          <Nav.Link href="/book/orders">Orders</Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          {isLoggedIn() ? (
            <button className="btn btn-light" onClick={handleLogout}>Logout</button>
          ) : (
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
