// import React, { useState } from "react";
// import axios from "axios";
// import "./Checkout.css";

// const PaymentSection = () => {

//   const [contactInfo, setContactInfo] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     city: "",
//     zip: "",
//     street: "",
//     houseNumber: "",
//     country: "",
//   });

//   const [isFormValid, setIsFormValid] = useState(true);
//   const [showModal, setShowModal] = useState(false);

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const handleFormChange = (event) => {
//     setContactInfo({ ...contactInfo, [event.target.name]: event.target.value });
//   };

//   const onSubmitHandler = (event) => {
//     event.preventDefault();

//     for (let contactInfoField of Object.keys(contactInfo)) {
//       if (contactInfo[contactInfoField].trim() === "") {
//         setIsFormValid(false);
//         return;
//       }
//     }

//     setIsFormValid(true);
//     const products = cart.map((product) => {
//       return { count: product.qty, product: product.id };
//     });

//     try {
//       axios({
//         method: "POST",
//         url: "Order_Add", // Complete when ready
//         data: { ...contactInfo, products },
//       });
//       setShowModal(true);
//       deleteCart();
//     } catch (err) {
//       console.log(
//         "There was an error sending the order information to the server"
//       );
//     }
//   };

//   return (
//     <>
//       {showCart && (
//         <div id="person-continer" className="container">
//           <h5 className="mb-3 mt-2">Personal Details To Complete Checkout</h5>
//           <hr />
//           <form onSubmit={onSubmitHandler}>
//             <div className="row mb-3">
//               <div className="col-6">
//                 <label htmlFor="first-name-input" className="form-label">
//                   First Name
//                 </label>
//                 <input
//                   required
//                   onChange={handleFormChange}
//                   type="text"
//                   className="form-control"
//                   id="first-name-input"
//                   name="firstName"
//                 />
//               </div>

//               <div className="col-6">
//                 <label htmlFor="last-name-input" className="form-label">
//                   Last Name
//                 </label>
//                 <input
//                   required
//                   onChange={handleFormChange}
//                   type="text"
//                   className="form-control"
//                   id="last-name-input"
//                   name="lastName"
//                 />
//               </div>
//             </div>
//             <div className="row mb-3">
//               <div className="col-6">
//                 <label htmlFor="email-input" className="form-label">
//                   Email address
//                 </label>
//                 <input
//                   required
//                   onChange={handleFormChange}
//                   type="email"
//                   className="form-control"
//                   id="email-input"
//                   name="email"
//                 />
//               </div>

//               <div className="col-6">
//                 <label htmlFor="phone-input" className="form-label">
//                   Phone number
//                 </label>
//                 <input
//                   required
//                   onChange={handleFormChange}
//                   type="number"
//                   className="form-control"
//                   id="phone-input"
//                   name="phone"
//                 />
//               </div>
//             </div>
//             <div className="row mb-3">
//               <div className="col-6">
//                 <label htmlFor="city-input" className="form-label">
//                   City / Town
//                 </label>
//                 <input
//                   required
//                   onChange={handleFormChange}
//                   type="text"
//                   className="form-control"
//                   id="city-input"
//                   name="city"
//                 />
//               </div>

//               <div className="col-6">
//                 <label htmlFor="street-input" className="form-label">
//                   Street
//                 </label>
//                 <input
//                   required
//                   onChange={handleFormChange}
//                   type="text"
//                   className="form-control"
//                   id="street-input"
//                   name="street"
//                 />
//               </div>
//             </div>
//             <div className="row mb-3">
//               <div className="col-6">
//                 <label htmlFor="house-number-input" className="form-label">
//                   House Number
//                 </label>
//                 <input
//                   required
//                   onChange={handleFormChange}
//                   type="number"
//                   className="form-control"
//                   id="house-number-input"
//                   name="houseNumber"
//                 />
//               </div>

//               <div className="col-6">
//                 <label htmlFor="zip-input" className="form-label">
//                   Zip Code
//                 </label>
//                 <input
//                   required
//                   onChange={handleFormChange}
//                   type="number"
//                   className="form-control"
//                   id="zip-input"
//                   name="zip"
//                 />
//               </div>
//             </div>

//             <div className="row mb-3">
//               <div className="col-6">
//                 <label htmlFor="country-input" className="form-label">
//                   Country
//                 </label>
//                 <input
//                   required
//                   onChange={handleFormChange}
//                   type="text"
//                   className="form-control"
//                   id="country-input"
//                   name="country"
//                 />
//               </div>
//             </div>
//             <div className="row mb-3 p-3">
//               <button
//                 type="submit"
//                 className="col btn btn-submit"
//                 disabled={isCartEmpty}
//               >
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//       <div
//         className={` p-2 flex-row flex-wrap submit-modal ${
//           showModal ? "show" : ""
//         }`}
//       >
//         <div className="w-100">
//           <h3>Thank you for your order</h3>
//         </div>

//         <div className="w-100 m-auto">
//           <span>Order submitted successfully!</span>
//         </div>
//         <div className="mt-auto w-100 justify-content-end d-flex">
//           <button
//             type="button"
//             className="btn btn-primary"
//             onClick={handleCloseModal}
//           >
//             Ok
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PaymentSection;
