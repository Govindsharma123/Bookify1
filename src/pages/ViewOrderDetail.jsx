import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase1";

const ViewOrderDetails = () => {
  const params = useParams();
  const firebase = useFirebase();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersSnapshot = await firebase.getOrders(params.bookId);
        console.log("Orders Snapshot:", ordersSnapshot.docs);

        // Check if ordersSnapshot.docs is not empty
        if (ordersSnapshot.docs.length > 0) {
          // Map the documents to data and set state
          const ordersData = ordersSnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              qty: data.qty,
              displayName: data.displayName || "Unknown User",
              userEmail: data.userEmail || "unknown@example.com",
            };
          });
          setOrders(ordersData);
        } else {
          console.log("No orders found for bookId:", params.bookId);
          // Handle case where no orders are found
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (params.bookId && firebase) {
      fetchOrders();
    }
  }, [params.bookId, firebase]);

  // useEffect(() => {
  //   firebase.getOrders(params.bookId).then((orders) => setOrders(orders.docs));
  // }, []);



  return (
    <div className="container mt-3">
    <h1>Orders</h1>
    {orders.length > 0 ? (
      orders.map((order) => (
        <div
          key={order.id}
          className="mt-5"
          style={{ border: "1px solid", padding: "10px" }}
        >
          <h5>Order By: {order.displayName}</h5>
          <h6>Qty: {order.qty}</h6>
          <p>Email: {order.userEmail}</p>
        </div>
      ))
    ) : (
      <p>No orders found for bookId: {params.bookId}</p>
    )}
  </div>
);

};

export default ViewOrderDetails;