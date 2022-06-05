import React, { useState, useEffect } from 'react';
import { getProducts } from '../axios-services';

const Products = () => {
    const [products, setProducts] = useState([]);
    useEffect (()=> {

        const getAllProducts = async () =>{
          const products = await getProducts();
          setProducts(products)
          console.log(products)
      
        };
        getAllProducts();
      },[])

    return(

        <> {products.map(product => <div key = {product.id}> 
            <p>{product.name}</p>
            <p>{product.description}</p> 
            <p>${product.price}</p>
            <p>{product.pictures}</p>
            </div>)}</>

    
    )};

export default Products;