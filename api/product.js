const express = require('express');
const productRouter = express.Router();
const { requireUser } = require('./utils');
const { createProducts, getProductById, getAllProducts, deleteProduct } = require('../db/models/product');
const { isUserAdmin } = require('../db');



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


productRouter.delete(
    "/:productId",
    async (req, res, next) => {
      try {
        const { productId } = req.params;
        console.log (req.user)
        const productDelete = await getProductById(productId);
       if (req.user.admin === true) {
          const deleteProducts = await deleteProduct(productId, req.user.id);
          res.send(deleteProducts);
        } else {
          next({ message: "error" });
        }
      } catch (error) {
          console.log(error)
        next(error);
      }
    }
  );
  





module.exports = productRouter;