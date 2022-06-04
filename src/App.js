// // getAPIHealth is defined in our axios-services directory index.js
// // you can think of that directory as a collection of api adapters
// // where each adapter fetches specific info from our express server's /api route

import { getAPIHealth, getAllProducts, retrieve, add, update, remove, emptyCart, capture, refreshCart } from './axios-services';
 import './style/App.css'
import React, { useState, useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar, Products, Checkout, Cart } from './components';

const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const testHealth = async () => {
    const { data } = await getAPIHealth();
  
  }



  const fetchProducts = async () => {
    const data = await getAllProducts();
    console.log(data)

    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await retrieve());
  };

  const handleAddToCart = async () => {
    const item = await add();

    setCart(item.cart);
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await update(lineItemId, { quantity });

    setCart(response.cart);
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const response = await remove(lineItemId);

    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    //need to pass in the props from main
    const response = await emptyCart();

    setCart(response.cart);
  };


  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
    testHealth();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar totalItems={cart.total_items} handleDrawerToggle={handleDrawerToggle} />
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} handleUpdateCartQty />
          </Route>
          <Route exact path="/cart">
            <Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
          </Route>
          <Route path="/checkout" exact>
            {<Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} /> }
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;