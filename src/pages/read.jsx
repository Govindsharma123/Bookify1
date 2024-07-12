// import React, { useState } from 'react'
// import firebaseApp from '../context/Firebase1'
// import { getDatabase, ref, get} from 'firebase/database'
// import { useNavigate } from 'react-router-dom'

// const Read = () => {
//   const navigate = useNavigate();

//   const [bookArray, setBookArray] = useState([]);

//   const fetchData = async()=>{
//     const db = getDatabase(firebaseApp);
//     const dbRef = ref(db, "cover/books");
//     const snapshot = await get(dbRef);

//     if(snapshot.exists()){
//       setBookArray(Object.values(snapshot.val()));
//     }else{
//       alert('error')
//     }
//   }
//   return (
//     <div>
//       <h1>read page</h1>
//       <button className='border' onClick={fetchData}>Display Data</button>
//       <ul>
//         {bookArray.map((item,index)=>(
//           <li key={index}>
//             {item.bookName} : {item.description}

//           </li>
//         ))}
//       </ul>
//       <button className='button1 border' onClick={ () => navigate("/updateread")}>GO UPDATE READ</button> <br />
//       <button className='button1 border' onClick={ () => navigate("/")}>GO HOMEPAGE</button>
//     </div>
//   )
// }

// export default Read
