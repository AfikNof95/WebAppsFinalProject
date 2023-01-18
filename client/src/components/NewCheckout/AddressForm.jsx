import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CheckoutContext from "../../context/checkoutContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function AddressForm(props) {
  const checkoutCntxt = useContext(CheckoutContext);
  const { isNextAvailable, setIsNextAvailable, handleNext } = props;

  const checkFormValidation = () => {
    // can also use formik
    for (let contactInfoField of Object.keys(checkoutCntxt.tmpUserInfo)) {
      if (
        checkoutCntxt.tmpUserInfo[contactInfoField].trim() === "" &&
        !(contactInfoField == "address2")
      ) {
        setIsNextAvailable(false);
        return;
      }
    }
    setIsNextAvailable(true);
    return;
  };

  useEffect(() => {
    checkFormValidation();
  }, []);

  useEffect(() => {
    checkFormValidation();
  }, [checkoutCntxt.tmpUserInfo]);

  return (
    <React.Fragment>
      <Typography variant="h6" sx={{ marginBottom: "1.5em" }} gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="fName"
            label="First name"
            value={
              checkoutCntxt?.tmpUserInfo?.fName &&
              checkoutCntxt.tmpUserInfo.fName
            }
            placeholder={!checkoutCntxt?.tmpUserInfo?.fName && "First Name..."}
            fullWidth
            autoComplete="given-name"
            variant="standard"
            inputProps={{ maxLength: 14, minLength: 2 }}
            onChange={checkoutCntxt.handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lName"
            label="Last name"
            value={
              checkoutCntxt?.tmpUserInfo?.lName &&
              checkoutCntxt.tmpUserInfo.lName
            }
            placeholder={!checkoutCntxt?.tmpUserInfo?.lName && "Last Name..."}
            fullWidth
            autoComplete="family-name"
            variant="standard"
            inputProps={{ maxLength: 14, minLength: 2 }}
            onChange={checkoutCntxt.handleFormChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            value={
              checkoutCntxt?.tmpUserInfo?.address1 &&
              checkoutCntxt.tmpUserInfo.address1
            }
            placeholder={!checkoutCntxt?.tmpUserInfo?.address1 && "Address..."}
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            inputProps={{ maxLength: 22, minLength: 2 }}
            onChange={checkoutCntxt.handleFormChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            value={
              checkoutCntxt?.tmpUserInfo?.address2 &&
              checkoutCntxt.tmpUserInfo.address2
            }
            placeholder={
              !checkoutCntxt?.tmpUserInfo?.address2 && "Address 2..."
            }
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            inputProps={{ maxLength: 22, minLength: 2 }}
            onChange={checkoutCntxt.handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            value={
              checkoutCntxt.tmpUserInfo.city && checkoutCntxt.tmpUserInfo.city
            }
            placeholder={!checkoutCntxt.tmpUserInfo.city && "City..."}
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            inputProps={{ maxLength: 18, minLength: 2 }}
            onChange={checkoutCntxt.handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            value={
              checkoutCntxt?.tmpUserInfo?.state &&
              checkoutCntxt.tmpUserInfo.state
            }
            placeholder={!checkoutCntxt?.tmpUserInfo?.state && "State..."}
            fullWidth
            variant="standard"
            inputProps={{ maxLength: 20, minLength: 2 }}
            onChange={checkoutCntxt.handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            value={
              checkoutCntxt?.tmpUserInfo?.zip && checkoutCntxt.tmpUserInfo.zip
            }
            placeholder={!checkoutCntxt?.tmpUserInfo?.zip && "Zip..."}
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            inputProps={{ maxLength: 8, minLength: 4 }}
            onChange={checkoutCntxt.handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            value={
              checkoutCntxt?.tmpUserInfo?.country &&
              checkoutCntxt?.tmpUserInfo?.country
            }
            placeholder={!checkoutCntxt?.tmpUserInfo?.country && "Country..."}
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            inputProps={{ maxLength: 22, minLength: 2 }}
            onChange={checkoutCntxt.handleFormChange}
          />
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={handleNext}
          sx={{ mt: 3, ml: 1 }}
          disabled={!isNextAvailable}
        >
          Next
        </Button>
      </Box>
    </React.Fragment>
  );
}


// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";

// function MyForm() {
//   return (
//     <Formik
//       initialValues={{ name: "", email: "", password: "" }}
//       validate={(values) => {
//         const errors = {};
//         if (!values.name) {
//           errors.name = "Name is required";
//         }
//         if (!values.email) {
//           errors.email = "Email is required";
//         } else if (
//           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
//         ) {
//           errors.email = "Invalid email address";
//         }
//         if (!values.password) {
//           errors.password = "Password is required";
//         } else if (values.password.length < 8) {
//           errors.password = "Password must be at least 8 characters";
//         }
//         return errors;
//       }}
//       onSubmit={(values, { setSubmitting }) => {
//         setTimeout(() => {
//           alert(JSON.stringify(values, null, 2));
//           setSubmitting(false);
//         }, 400);
//       }}
//     >
//       {({ isSubmitting }) => (
//         <Form>
//           <Field type="text" name="name" placeholder="Name" />
//           <ErrorMessage name="name" component="div" />
//           <Field type="email" name="email" placeholder="Email" />
//           <ErrorMessage name="email" component="div" />
//           <Field type="password" name="password" placeholder="Password" />
//           <ErrorMessage name="password" component="div" />
//           <button type="submit" disabled={isSubmitting}>
//             Submit
//           </button>
//         </Form>
//       )}
//     </Formik>
//   );
// }
