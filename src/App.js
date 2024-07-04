import { Routes, Route } from "react-router-dom";


// Components
import MyNavbar from "./components/Navbar";

// Pages
import RegisterPage from "./pages/Signuppage";
import CreateAccount from "./pages/create-account";
import { Loginpage } from "./pages/Loginpage";
import ListingPage from "./pages/List";
import BookPage from "./pages/Books";
import BookDetailPage from "./pages/Detail";
import OrdersPage from "./pages/ViewOrder";
import ViewOrderDetails from "./pages/ViewOrderDetail";
import NotFoundPage from "./pages/Notfound";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HomePage from "./pages/Home";

function App() {
  

  return (
    <div>
      
      <MyNavbar />
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/books" element={<BookPage />} />
        <Route path="/login" element={<Loginpage />} />
        {/* <Route  path="/create-account" element={<CreateAccount/>} /> */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/book/list" element={<ListingPage />} />
        <Route path="/book/view/:bookId" element={<BookDetailPage />} />
        <Route path="/book/orders" element={<OrdersPage />} />
        <Route path="/books/orders/:bookId" element={<ViewOrderDetails />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      
    </div>
  );
}

export default App;
