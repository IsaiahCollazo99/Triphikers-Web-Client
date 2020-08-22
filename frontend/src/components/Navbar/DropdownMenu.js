// import React, { useState, useEffect, useRef } from 'react';
// import { logout } from '../../util/firebaseFunction';

// function DropdownMenu() {
//   const [activeMenu, setActiveMenu] = useState('main');
//   const [menuHeight, setMenuHeight] = useState(null);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
//   }, [])

//   function calcHeight(el) {
//     const height = el.offsetHeight;
//     setMenuHeight(height);
//   }

//   function DropdownItem(props) {
//     return (
//       <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
//         <span className="icon-button">{props.leftIcon}</span>
//         {props.children}
//         <span className="icon-right">{props.rightIcon}</span>
//       </a>
//     );
//   }

//   return (
//     <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>

//       <CSSTransition
//         in={activeMenu === 'main'}
//         timeout={500}
//         classNames="menu-primary"
//         unmountOnExit
//         onEnter={calcHeight}>
//         <div className="menu">
//           <DropdownItem>FirstName</DropdownItem>
//           <DropdownItem
           
//             goToMenu="settings">
//             Settings
//           </DropdownItem>
        

//         </div>
//       </CSSTransition>

//       <CSSTransition
//         in={activeMenu === 'FirstName'}
//         timeout={500}
//         classNames="menu-secondary"
//         unmountOnExit
//         onEnter={calcHeight}>
//         <div className="menu">
//           <DropdownItem goToMenu="main" leftIcon={<FirstName />}>
//             <h2>My Tutorial</h2>
//           </DropdownItem>
//           <DropdownItem
//             // leftIcon={<Profile />}
//           >Profile</DropdownItem>
//           <DropdownItem
//             // leftIcon={<Message />}
//           >Message</DropdownItem>
//           <DropdownItem
//             // leftIcon={<Logout />}
//           >Logout</DropdownItem>
         
//         </div>
//       </CSSTransition>

      
//     </div>
//   );
// }
// export default DropdownMenu
