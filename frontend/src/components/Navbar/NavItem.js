// import React, { useState,useEffect } from 'react';
// import firebase from "../../firebase"

// const NavItem=(props) =>{
//   const [open, setOpen] = useState(false);
//   const [firstName , setFirstName]= useState("")

//   const fetchFirstName = () => {
//     firebase.auth().onAuthStateChanged(async user => {
//       debugger
//         setFirstName(user.displayName.split(" ")[0])
//     })
//   }
//   console.log(firstName)
  
//   useEffect(() => {
//     fetchFirstName()
//   }, [])

//   return (
//     <>
//      <li className="nav-item">
//       <NavItem >
//        Hi, {firstName} 
//         </NavItem>
       

//        {/* <a href="#" className="icon-button" onClick={() => setOpen(!open)}> */}
      
//        {/* </a> */}
      

//        {/* {open && props.children} */ }


//      </li>
//     </>
//   );
// }
// export default NavItem