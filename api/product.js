const express = require('express');
const productRouter = express.Router();
const { requireUser } = require('./utils');
const { createProducts, getProductById, getAllProducts } = require('../db/models/product');



productRouter.use((req, res, next) => {
    console.log('A request is being made to /Product');
    next();
});
productRouter.get('/', async (req, res, next) => {
    try {
        const products = await getAllProducts();
        res.send(products);
    } catch (error) {
        next(error)
    }
});
productRouter.post('/', async (req, res, next) => {
    try {
        const newProduct = await createProducts(req.body);
        res.send(newProduct);
    } catch (error) {
        next(error);
    }
});

//  NEEDS TO BE TESTED AND POSSIBLY REWRITE 

// productRouter.patch('/:productId', requireUser, async (req, res, next) => {
//     try {
//         const { productId } = req.params;
//         const { name, description } = req.body;
//         const originalProduct = await getProductById(productId);
//         if (!originalProduct) {
//             next({
//                 name: 'no Product Error',
//                 message: 'There is no original Product'
//             })
//         }
//         if (parseInt(originalProduct.id) === parseInt(productId)) {
//             const updatedProduct = await updatedProduct({ id: productId, name, description });
//             res.send(updatedProduct)
//         } else {
//             next({
//                 name: 'InvalidUpdate',
//                 message: 'Update could not be completed'
//             });
//         }
//     } catch (error) {
//         next(error);
//     }
// });

module.exports = productRouter;