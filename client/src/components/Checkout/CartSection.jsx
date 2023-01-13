import React, { useEffect, useState } from "react";
import "./Checkout.css";

const CartSection = (props) => {
  // Props or Db GET request
  const {
    //cart, // from Db or Props
    onAddProduct, // When changing the qty of a product
    onRemoveProduct, // Same
    isInCartPage, // Show or hide
    setIsInCartPage, // Change the state
    setUserShoppingCart, // Change the users cart state
  } = props;

  tmpCartForTest = {}; // Make an array of products
  cart = tmpCartForTest;

  const cartPriceBeforeTax = cart.reduce(
    (sumPrice, currentProduct) =>
      sumPrice + currentProduct.qty * currentProduct.price,
    0
  );
  const cartsILTax = cartPriceBeforeTax * 0.17; //Nice to have LOL
  const cartSumPrice = cartPriceBeforeTax + cartsILTax;
  const isCartEmpty = cart.length === 0;

  const [isFormValid, setIsFormValid] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const deleteCart = () => {
    setUserShoppingCart([]);
  };

  useEffect(() => {
    setIsInCartPage(true);
  }, []);

  return (
    <>
      <div>
        {cart.length == 0 && (
          <h3 className="fw-bolder text-black">Your cart is empty!</h3>
        )}
      </div>
      {cart.length > 0 && (
        <div id="cart-sum-continer" className="container">
          <h3 className="fw-bolder text-black">Cart</h3>
          {cart.map((item, index) => (
            <div className="row card-container" key={index}>
              <div className="card cart-card" style={{ paddingLeft: 0 }}>
                <div className="row align-items-center g-0">
                  <div className="col-2 img-container">
                    <img
                      src={`${item.firstPhotoUrl}`}
                      className="img-fluid rounded-start"
                      alt={`${item.name}`}
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="col-7 d-flex flex-column body-container">
                    <div className="card-body">
                      <span>
                        <h5 className="card-title text-left">{item.name}</h5>
                      </span>
                      <div className="text-left description-wrapper">
                        {item.description}
                      </div>
                      <span className="row buttons-section">
                        <div className="row">
                          <button
                            type="button"
                            className="col btn btn-success"
                            onClick={() => onAddProduct(item, isInCartPage)}
                          >
                            <h>+</h>
                          </button>
                          <div className="col qty-wrapper ps-2 me-2 ms-2 d-flex justify-content-center align-items-center">
                            {item.qty}
                          </div>
                          <button
                            type="button"
                            className="col btn btn-danger"
                            onClick={() => onRemoveProduct(item)}
                          >
                            <h>-</h>
                          </button>
                        </div>

                        <div className="col"></div>
                      </span>
                    </div>
                  </div>
                  <div className="col-3">
                    <div>
                      {item.qty} X ${item.price.toFixed(2)} each
                    </div>
                    <div>
                      <strong>${item.qty * item.price} total</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <h5>
            <u>Payment summarize</u>
          </h5>
          <hr />
          <div className="row">
            <div className="col">
              <div className="right-border">Items Price</div>
              <div className="right-border">Tax Price</div>
              <div className="right-border">
                <strong>Total price</strong>
              </div>
            </div>
            <div className="col">
              <div className="right-border">
                ${cartPriceBeforeTax.toFixed(2)}
              </div>
              <div className="right-border">${cartsILTax.toFixed(2)}</div>
              <div className="right-border">
                {" "}
                <strong>${cartSumPrice.toFixed(2)}</strong>
              </div>
            </div>
            <div className="col delete-cart-col">
              {/* <Link to={"/"}> */}
              {/*Make Link*/}
              <button
                id="delte-all-cart-btn"
                type="button"
                className="btn btn-danger"
                onClick={deleteCart}
              >
                Delete Cart
              </button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartSection;
