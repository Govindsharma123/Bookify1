import React from 'react'
import photo from "../assests/logo.jpg"
const HomePage = ()=> {
  return (
    <div className="flex flex-col items-center justify-center  mt-10">
      <div className="relative">
        <img className="w-50 h-50  mx-auto shadow-md" src={photo} alt="Book-Bank Logo" />
        {/* <h1 className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xl font-bold text-gray-800">
          Book-Bank
        </h1> */}
      </div>
      <div className="mt-8 max-w-lg p-6 bg-white shadow-md rounded-lg">
        <p className="text-gray-700 text-lg leading-relaxed">
          Book_Bank is your go-to platform for buying and selling books. Whether you're looking to declutter your shelves or find your next literary adventure, Book_Bank provides a seamless experience. List your books effortlessly, browse a wide selection, and connect with book lovers worldwide. Join us in fostering a community where every book finds its reader, and every reader finds their next favorite story. Welcome to Book_Bank, where books meet their match.
        </p>
      </div>
    </div>
  )
}

export default HomePage;
