import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase1";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



const BookDetailPage = () => {
  const params = useParams();
  const firebase = useFirebase();
  const {addToCart} = useCart();
  const navigate = useNavigate();

  // const [qty, setQty] = useState(1);
  const [data, setData] = useState(null);
  const [url, setURL] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await firebase.getBookById(params.bookId);
        if (value) {
          setData(value);
        } else {
          console.error("No book data found");
        }
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };
    fetchData();
  }, [params.bookId, firebase]);

  useEffect(() => {
    if (data && data.imageURL) {
      const fetchImageURL = async () => {
        try {
          const url = await firebase.getImageURL(data.imageURL);
          setURL(url);
        } catch (error) {
          console.error("Error fetching image URL:", error);
        }
      };
      fetchImageURL();
    }
  }, [data, firebase]);

  const handleAddToCart = async() => {
    try {
      const cartItem = {
        ...data,
        imageURL: url,
      }; 
     await addToCart(cartItem);
    toast.success("book added to cart");
    navigate('/cart');
    console.log("added to cart" );
  }
   catch(error){
    console.log("error in adding to cart", error)
   }
  }


  
  if (data == null) return <h1>Loading...</h1>;

  return (
    <div className="container mt-5">
      <h1>{data.name}</h1>
      <div style={{ display: 'flex'}}>
        <img 
          src={url} 
          alt="Book cover" 
          style={{ 
            Width: '50%', 
            height: '300px', 
            borderRadius: '10px', 
            objectFit: 'cover' 
          }} 
        />
      </div>
      <h1>Details</h1>
      <p>Price: Rs. {data.price}</p>
      <p>ISBN Number. {data.isbn}</p>
      <h1>Owner Details</h1>
      <p>Name: {data.displayName}</p>
      <p>Email: {data.userEmail}</p>
      {/* <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Qty</Form.Label>
        <Form.Control
          onChange={(e) => setQty(e.target.value)}
          value={qty}
          type="Number"
          placeholder="Enter Qty"
        />
      </Form.Group> */}
      <Button onClick={handleAddToCart} variant="success">
        Add to Cart
      </Button>
    </div>
  );
};

export default BookDetailPage;

