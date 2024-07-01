import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useMemo, useCallback } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Components
import MyNavbar from "./components/Navbar";

// Pages
import RegisterPage from "./pages/Signuppage";
import LoginPage from "./pages/Loginpage";
import ListingPage from "./pages/List";
import HomePage from "./pages/Home";
import BookDetailPage from "./pages/Detail";
import OrdersPage from "./pages/ViewOrder";
import ViewOrderDetails from "./pages/ViewOrderDetail";
import NotFoundPage from "./pages/Notfound";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const auth = getAuth();

  const handleAuthStateChanged = useCallback((user) => {
    setUser(user);
    setIsLoggedIn(!!user);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged);
    return () => unsubscribe();
  }, [auth, handleAuthStateChanged]);

  return (
    <div>
<<<<<<< HEAD



<<<<<<< HEAD
      {/* <MyNavbar /> */}
      <Routes>
        <Route path="/" element={<><MyNavbar /> <HomePage/></>} />
        <Route path="/login" element={<><MyNavbar /><LoginPage /></>} />
        <Route path="/register" element={<><MyNavbar /><RegisterPage /></>} />
        <Route path="/book/list" element={<><MyNavbar /><ListingPage /></>} />
        <Route path="/book/view/:bookId" element={<><MyNavbar /><BookDetailPage /></>} />
        <Route path="/book/orders" element={<><MyNavbar /><OrdersPage /></>} />
        <Route path="/books/orders/:bookId" element={<><MyNavbar /><ViewOrderDetails /></>} />
        <Route path="/login" element={<><MyNavbar /><LoginPage /></>} />
        <Route path="/register" element={<><MyNavbar /><RegisterPage /></>} />
        <Route path="*" element={<><MyNavbar /><NotFoundPage /></>} /> {/* Catch-all route */}
=======
      <MyNavbar />
=======
      <MyNavbar isLoggedIn={isLoggedIn} />
>>>>>>> d8bdad8 (hel)
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/book/list" element={<ListingPage />} />
        <Route path="/book/view/:bookId" element={<BookDetailPage />} />
        <Route path="/book/mybooks" element={<OrdersPage />} />
        <Route path="/books/orders/:bookId" element={<ViewOrderDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
<<<<<<< HEAD
        <Route path="*" element={<NotFoundPage />} /> {/* Catch-all route */}
>>>>>>> b20431f (hello)
=======
        <Route path="*" element={<NotFoundPage />} />
>>>>>>> d8bdad8 (hel)
      </Routes>
      {isLoggedIn ? (
        <div>Welcome, {user.displayName}!</div>
      ) : (
        <div>Please log in to access this content.</div>
      )}
    </div>
  );
}

export default App;