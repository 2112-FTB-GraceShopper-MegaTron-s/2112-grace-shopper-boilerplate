const express = require("express");
const cartRouter = express.Router();
// const { requireUser } = requireUser('./utils');
const { getCartById, getAllCarts, createCart, updateCart, getTotalCartItemPrice, getCartsByUser } = require('../db/models/cart');
const productRouter = require("./product");

cartRouter.use((req, res, next) =>{
    console.log("A request is being made to cart");
    next();
    
});

cartRouter.get('/', async (req, res, next) => {
    try{
        const carts = await getAllCarts();
        res.send(carts);
    }catch (error){
        next (error)
    }
});

cartRouter.post('/', async (req, res, next) => {
    try{
        const newCart = await createCart(req.body);
        res.send(newCart);
    } catch (error){
     next(error);
    }
});

module.exports = cartRouter;