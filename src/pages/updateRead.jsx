// import React, { useState } from 'react'
// import firebaseApp from '../context/Firebase1'
// import { getDatabase, ref, get} from 'firebase/database'
// import { useNavigate } from 'react-router-dom'

// const UpdateRead = () => {
//   const navigate = useNavigate();

//   const [bookArray, setBookArray] = useState([]);

//   const fetchData = async()=>{
//     const db = getDatabase(firebaseApp);
//     const dbRef = ref(db, "cover/books");
//     const snapshot = await get(dbRef);

//     if(snapshot.exists()){

//       const myData = snapshot.val();
//       const tempArray = Object.keys(myData).map(myFireId => {
//         return {
//           ...myData[myFireId],
//           bookId: myFireId
//         }
//       })

//       setBookArray(tempArray);   ///object laane se id hat jaati h
//     }else{
//       alert('error')
//     }
//   }
//   return (
//     <div>
//       <h1>update read page</h1>
//       <button className='border' onClick={fetchData}>Display Data</button>
//       <ul>
//         {bookArray.map((item,index)=>(
//          <>
//           <li key={index}>
//             {item.bookName} : {item.description} :{item.bookId}
//             <button className=' border' onClick={()=> navigate(`/updatewrite/${item.bookId}`)}>update</button>
//           </li>
//           </>
//         ))}
//       </ul>

   
//       <button className='border' onClick={ () => navigate("/read")}>GO READ PAGE</button>
//     </div>
//   )
// }

// export default UpdateRead
