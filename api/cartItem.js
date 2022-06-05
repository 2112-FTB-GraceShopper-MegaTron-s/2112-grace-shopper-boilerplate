const express = require('express');
const cartItemRouter = express.Router();
const { requireUser } = require('./utils');
const {  getCartItemById, addProductToCart, updateCartItem, destroyCartItem } = require('../db/models/cartItem');
const { isUserAdmin } = require('../db');
const { getAllCarts } = require('../db/models/cart');




cartItemRouter.use((req, res, next) =>{
    console.log('a request is being made to /cartItem');
    next();
});


cartItemRouter.get('/:cartItemId', async (req, res, next) => {
    const { cartId } = req.body;
    try{
        const cartItemId = await getCartItemById(cartId);
        res.send(cartItemId);
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



cartItemRouter.patch('/:cartItemId', requireUser, async(req, res, next) =>{

    const {productId, cartId, price} = req.body;
    const { cartItemId: id} = req.params;
    try{
        const update = await updateCartItem({ productId, cartId, price, id});
        res.send(update);
}catch (error){
    next(error);
}
});

cartItemRouter.delete('/:cartItemId', requireUser, async(req, res, next) => {
  
});




module.exports = cartItemRouter;