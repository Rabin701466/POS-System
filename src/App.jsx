import React, { useState } from "react";
import "./App.css";
import Navbar from "./Components/NavBar/Navbar";
import ProductMenu from "./Components/ProductCard/ProductMenu";
import Cart from "./Components/ProductCard/Cart";
import ProcessPayment from "./Components/ProductCard/ProcessPayment";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const taxRate = 0.08;
  const [showPayment, setShowPayment] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);

  const handleAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const handleDecrease = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty - 1 } : x
        )
      );
    }
  };

  const handleDelete = (product) => {
    setCartItems(cartItems.filter((x) => x.id !== product.id));
  };

  const handleIncrease = (product) => {
    setCartItems(
      cartItems.map((x) =>
        x.id === product.id ? { ...x, qty: x.qty + 1 } : x
      )
    );
  };

  const handleProcessPayment = (total) => {
    setCartTotal(total);
    setShowPayment(true);
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <>
      <Navbar className="navbar" />
      <div className="app-container">
        <div className="main-content">
          <ProductMenu className="productmenu" handleAdd={handleAdd} />
          <Cart
            className="cart"
            cartItems={cartItems}
            handleIncrease={handleIncrease}
            handleDecrease={handleDecrease}
            handleDelete={handleDelete}
            taxRate={taxRate}
            onProcessPayment={handleProcessPayment}
            handleClearCart={handleClearCart}
          />
        </div>

        {showPayment && (
          <div className="modal-overlay">
            <div className="modal-content">
              <ProcessPayment
                totalAmount={cartTotal}
                onClose={() => setShowPayment(false)}
              />
            </div>
          </div>
        )}
      </div>
    </>

  );
}

export default App;
