// import React, { useState } from 'react'
// import firebaseApp from '../context/Firebase1'
// import { getDatabase, ref, set, push } from 'firebase/database'
// import { useNavigate } from 'react-router-dom'

// const Write = () => {
//   const navigate = useNavigate();

//   const [inputValue1, setInputValue1] = useState("");
//   const [inputValue2, setInputValue2] = useState("");

  
//   const saveData= async()=>{
//     const db = getDatabase(firebaseApp);
//     const newDocRef = push(ref(db, "cover/books"));
//     set(newDocRef, {
//       bookName: inputValue1,
//       description: inputValue2
//     }).then(()=>{
//       alert("data saved succesully")
//     }).catch((error) => {
//       alert("error:", error.message)
//     })
//   }


//   return (
//     <div>
//       <h1>write page</h1>

//       <input className='border' type='text' value={inputValue1}
//       onChange={(e) => setInputValue1(e.target.value)}/>

//       <input className='border' type='text' value={inputValue2}
//       onChange={(e) => setInputValue2(e.target.value)}/> 

//       <br/>

//       <button className='border' onClick={saveData}>Save Data</button>
//       <br />
//       <br />
//       <br />
//       <button className='button1 border' onClick={ () => navigate("/updateread")}>GO UPDATE READ</button> <br />
//       <button className='button1 border' onClick={ () => navigate("/read")}>GO READ PAGE</button>
//     </div>
//   )
// }

// export default Write
