import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase1";

const BookCard = (props) => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [url, setURL] = useState(null);

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

  return (
    <div className="max-w-xs w-full m-6 flex flex-col justify-between bg-white shadow-md rounded-lg overflow-hidden">
      {url && (
        <img
          className="w-full h-48 object-cover"
          src={url}
          alt={props.name}
        />
      )}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h5 className="text-lg font-bold mb-2">{props.name}</h5>
          <p className="text-sm mb-4">
            This book has a title {props.name} and this book is sold by {props.displayName}.<br/><br/>
            Rs.{props.price}
          </p>
        </div>
        <button
          onClick={() => navigate(props.link)}
          className="mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default BookCard;
