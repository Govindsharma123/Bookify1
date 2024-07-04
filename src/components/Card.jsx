import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { useFirebase } from "../context/Firebase1";

const BookCard = (props) => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [url, setURL] = useState(null);

  // useEffect(() => {
  //   firebase.getImageURL(props.imageURL).then((url) => setURL(url));
  // }, []);
  useEffect(() => {
    const fetchImageURL = async () => {
      try {
        const url = await firebase.getImageURL(props.imageURL);
        setURL(url);
      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    };

    if (props.imageURL) {
      fetchImageURL();
    }
  }, [firebase, props.imageURL]);

  // console.log(props);

  return (
    <Card style={{width: "18rem", margin: "25px", display: "flex", flexDirection: "column", justifyContent: "space-between"  }}>
      
      <Card.Img variant="top" src={url} style={{ height: "200px", objectFit: "cover" }}  />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>

          <Card.Text>
          This book has a title {props.name} and this book is sold by{" "}
          {props.displayName} <br/> <br/>
          Rs.{props.price }
        </Card.Text> 
        
        {/* <Button onClick={(e) => navigate(props.link)} variant="primary"> */}
        <Button onClick={() => {
          console.log("Navigating to: ", props.link); // Debugging statement
          navigate(props.link);
        }} variant="primary">
          View
        </Button>
      </Card.Body>
      
      
    </Card>
  );
};

export default BookCard;
