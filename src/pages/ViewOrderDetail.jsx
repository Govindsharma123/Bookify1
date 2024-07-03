import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const ViewOrderDetails = () => {
  const params = useParams();
  const firebase = useFirebase();

  const [orders, setOrders] = useState([]);

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       if (params.bookId && firebase) {
  //         const ordersSnapshot = await firebase.getOrders(params.bookId);
  //         console.log("Orders Snapshot:", ordersSnapshot.docs);

  //         // Map the documents to data and set state
  //         const ordersData = ordersSnapshot.docs.map((doc) => {
  //           const data = doc.data();
  //           return {
  //             id: doc.id,
  //             qty: data.qty,
  //             // Add default values or placeholders for missing fields
  //             displayName: "Unknown User",
  //             userEmail: "unknown@example.com",
  //           };
  //         });
  //         setOrders(ordersData);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching orders:", error);
  //     }
  //   };

  //   fetchOrders();
  // }, [params.bookId, firebase]);

  useEffect(() => {
    firebase.getOrders(params.bookId).then((orders) => setOrders(orders.docs));
  }, []);



  return (
    <div className="container mt-3">
      <h1>Orders</h1>
      {orders.map((order) => {
        const data = order.data();
        return (
          <div
            key={order.id}
            className="mt-5"
            style={{ border: "1px solid", padding: "10px" }}
          >
            <h5>Order By: {data.displayName}</h5>
            <h6>Qty: {data.qty}</h6>
            <p>Email: {data.userEmail}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ViewOrderDetails;