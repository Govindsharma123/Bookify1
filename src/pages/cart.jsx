import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Cart = () => {
  const { cart, removeFromCart, placeOrder } = useCart();
  const [error, setError] = useState(''); // Initialize error state

  const [quantities, setQuantities] = useState({});

  const handleQtyChange = (bookId, qty) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [bookId]: qty,
    }));
    setError(''); // Clear error message when quantity changes
  };

  const getQty = (bookId) => {
    return quantities[bookId] !== undefined ? quantities[bookId] : '';
  };

  const handlePlaceOrder = async (bookId) => {
    const qty = quantities[bookId] !== undefined ? parseInt(quantities[bookId]) : 0;

    if (qty > 0) {
      try {
        await placeOrder(bookId, qty);
        // Optionally, clear the quantities state or perform any post-order actions
        setQuantities({});
      } catch (error) {
        console.error("Error placing order:", error);
        setError('Error placing order. Please try again.');
      }
    } else {
      setError('Please enter a valid quantity.'); // Set error message when quantity is not valid
    }
  };

  return (
    <div className="container mt-5">
      <h1 className='flex justify-center mb-5'>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={`${item.id}-${index}`} className="mb-4">
              <div className="flex justify-between items-center">
                {item.fetchedImageURL && (
                  <img 
                    src={item.fetchedImageURL} 
                    alt="Book cover" 
                    style={{ 
                      width: '100px', 
                      height: '150px', 
                      borderRadius: '5px', 
                      objectFit: 'cover' 
                    }} 
                  />
                )}

                <div>
                  <p>Book Name: {item.name}</p>
                  <p>Price: Rs. {item.price}</p>
                </div>

                <div>
                  <label>Qty</label>
                  <input className='ml-2'
                    required
                    onChange={(e) => handleQtyChange(item.id, e.target.value)}
                    value={getQty(item.id)}
                    type="number"
                    placeholder="Enter Qty"
                    min="1" // Ensure minimum value is 1
                  />
                  {error && (
                    <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.2rem' }}>{error}</p>
                  )}
                </div>

                <Button
                  variant="success"
                  onClick={() => handlePlaceOrder(item.id)}
                >
                  Buy Book
                </Button>
                
                <Button 
                  variant="danger" 
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Link to="/books" className="btn btn-primary mt-3">
        Continue Shopping
      </Link>
    </div>
  );
};

export default Cart;
