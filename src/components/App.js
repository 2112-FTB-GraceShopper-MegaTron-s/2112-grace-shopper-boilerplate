import React, { useState, useEffect } from 'react';
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth, getProducts } from '../axios-services';
import '../style/App.css';
import {Products} from '../components';

const App = () => {
  const [APIHealth, setAPIHealth] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []);
useEffect (()=> {

  const getAllProducts = async () =>{
    const products = await getProducts();
    setProducts(products)
    console.log(products)

  };
  getAllProducts();
},[])
  return (
    <div className="app-container">
      <h1>Hello, World!</h1>
      <p>API Status: {APIHealth}</p>
      <Products />
    </div>

  );
};

export default App;