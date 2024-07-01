// Navbar.jsx
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

const MyNavbar = () => {
  const { isLoggedIn, logout } = useFirebase();
  const navigate = useNavigate();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  
  
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const loggedIn = await isLoggedIn(); // Assuming isLoggedIn is an async function
        setUserLoggedIn(loggedIn);
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoggedIn();
  }, [isLoggedIn]);

  const handleLogout = async () => {
    try {
      await logout();
      
      setUserLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/book/list">Add Listing</Nav.Link>
          <Nav.Link href="/book/orders">Orders</Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          {userLoggedIn ? (
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
