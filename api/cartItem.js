const express = require('express');
const cartItemRouter = express.Router();
const { requireUser } = require('./utils');
const {  getCartItemById, addProductToCart, updateCartItem, destroyCartItem, getItemsFromCart } = require('../db/models/cartItem');
const { isUserAdmin } = require('../db');
const { getAllCarts, getCartById } = require('../db/models/cart');




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



cartItemRouter.patch('/:cartId', requireUser, async(req, res, next) =>{
    const creatorId = req.user.id;
    const {productId, cartId, price, quantity } = req.body;
    const { cartItemId: id} = req.params;
    const cartItemById = await getCartItemById(id)
    const cartById = await getCartById(cartItemById.cartId)
    try{
        if (cartById.creatorId === creatorId){
        const update = await updateCartItem({ id, productId, cartId, price,quantity,});
        res.send(update);
    }
    else {next ({message: "you are not the creator can't update"})}

}catch (error){
    next(error);
}})



// cartItemRouter.patch('/:cartId', requireUser, async(req, res, next) => {
//     const creatorId =req.user.id;
//     const {cartItemById: id} = req.params;
//     const carById = await getCartItemById(id)

// })
// cartItemRouter.delete('/:cartItemId', requireUser, async(req, res, next) => {
  
// });




module.exports = cartItemRouter;