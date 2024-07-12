// import React, { useEffect, useState } from 'react'
// import firebaseApp from '../context/Firebase1'
// import { getDatabase, ref, get, set, update } from 'firebase/database'
// import { useNavigate,useParams} from 'react-router-dom'


// const UpdateWrite = () => {
//   const {firebaseId} = useParams();
//   const navigate = useNavigate();

//   const [inputValue1, setInputValue1] = useState("");
//   const [inputValue2, setInputValue2] = useState("");

//   useEffect(()=>{
//     const fetchData = async() => {
//       const db = getDatabase(firebaseApp);
//       const dbRef = ref(db, "cover/books/"+firebaseId);
//       const snapshot = await get(dbRef);
  
//       if(snapshot.exists()){
//         const targetObject = snapshot.val();
//         setInputValue1(targetObject.bookName)
//         setInputValue2(targetObject.description)
//       }else{
//         alert('error')
//       }
//     }
//     fetchData();
//   },[firebaseId])




//   const overWriteData= async()=>{
//     const db = getDatabase(firebaseApp);
//     const newDocRef = ref(db, "cover/books/"+firebaseId);
//     update(newDocRef, {
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
//       <h1>Update write page</h1>

//       <input className='border' type='text' value={inputValue1}
//       onChange={(e) => setInputValue1(e.target.value)}/>

//       <input className='border' type='text' value={inputValue2}
//       onChange={(e) => setInputValue2(e.target.value)}/> 

//       <br/>
//       <br/>
//       <button className='border' onClick={overWriteData}>update Data</button>
//       <br/>
//       <br/>
//       <button className='border' onClick={ () => navigate("/updateread")}>GO UPDATE READ</button> <br /> <br/>
//       <button className='border' onClick={ () => navigate("/read")}>GO READ PAGE</button>
//     </div>
//   )
// }

// export default UpdateWrite
