// import React, { useState, useEffect } from 'react'
// import api from '../../services/api';
// import { useParams } from 'react-router-dom';

// export default function Comments({ filme }) {
//     const [comments, setComments] = useState([]);
//     const {id} = useParams();
    


//     useEffect(() => {
//         api.get(`/produtos/${id}`)
//           .then(response => {
//             setComments(response.data);
//           })
//           .catch(error => {
//             console.error(error);
//           });
//       }, []);


    
//     return (
//         <div className="container text-center">
//             {comments.map((comment, i) => (
//                 <div className="row">
//                     <div className="col-md-3" key={i.toString()}>
//                         {comment.texto}
//                     </div>
//                     <div className="col-md-9" key={i.toString()}>
//                         {comment.nota}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     )
// }