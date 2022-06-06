const express = require('express');
const cartItemRouter = express.Router();
const { requireUser } = require('./utils');
const {  getCartItemById, addProductToCart, updateCartItem, destroyCartItem, getItemsFromCart } = require('../db/models/cartItem');
const { isUserAdmin } = require('../db');
const { getAllCarts } = require('../db/models/cart');




cartItemRouter.use((req, res, next) =>{
    console.log('a request is being made to /cartItem');
    next();
});


cartItemRouter.get('/:cartId', async (req, res, next) => {

    try{
        const {cartId} = req.params;
        console.log("req", req.params)
        const cartItems = await getItemsFromCart(cartId);
        console.log(cartItems)
        res.send(cartItems);
    } catch (error) {
        next(error)
    }

});

cartItemRouter.post('/', async (req, res, next) => {
    try{
        const newCartItem = await addProductToCart(req.body);
        res.send(newCartItem);
    }catch (error){
        next(error);
    }
});



// cartItemRouter.patch('/:cartId', requireUser, async(req, res, next) =>{
//     const creatorId = req.user.id
//     const {productId, cartId, price, quantity, } = req.body;
//     const { cartItemId: id} = req.params;
//     const cart
//     try{
//         const update = await updateCartItem({ productId, cartId, price,quantity, id});
//         res.send(update);
// }catch (error){
//     next(error);
// }
// });

// cartItemRouter.delete('/:cartItemId', requireUser, async(req, res, next) => {
  
// });




module.exports = cartItemRouter;