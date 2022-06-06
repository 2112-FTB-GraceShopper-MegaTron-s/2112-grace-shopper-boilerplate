const client = require("../client");
// creating tables 
async function createCartItem({productId, cartId, quantity, price}){
  try{
    const { rows : [ cartItem ] } = await client.query(`
      INSERT INTO cart_item ("productId", "cartId", quantity, price)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [productId, cartId, quantity, price])
    return cartItem;
  }catch(error){
    throw error;
  }
}





async function getItemsFromCart(cartId){
  try{
const { rows: [items] } = await client.query(`
SELECT cart_item.*, product.name AS "productName"
FROM cart_item
JOIN product ON product.id=cart_item."productId"
WHERE "cartId" = $1;


`, [cartId]);
return items;
  }catch(error){
    throw(error);
  }
}




// async function getCartItemById(id) {
//   try {
//     const { rows: [ cartItem ]  } = await client.query(`
//       SELECT *
//       FROM cart_item
//       WHERE id=$1;
//     `, [id]);

//     return cartItem;
//   } catch (error) {
//     throw error;
//   }
// }


async function addProductToCart({
    productId,
    cartId,
    quantity,
    price,
    userId
}) 
  
  {
  try {
    if (!productId){
      return null;
    }
    if (!cartId){
     const newCart = await createCart({userId,isPayFor, price});
     cartId = newCart.id
    }
    
    const {
      rows: [cartItem],
    } = await client.query(
      `
    INSERT INTO cart_item("productId", "cartId", quantity, price)
    VALUES ($1, $2, $3, $4) 
    ON CONFLICT ("productId", "cartId") DO NOTHING
    RETURNING *;
    `,
      [productId, cartId, quantity, price]
    );
    
    return cartItem;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateCartItem({ productId, cartId, price, id }) {
  try {
    const {
      rows: [cartItem],
    } = await client.query(
      `
        UPDATE cart_item
        SET productId=$1, cartId=$2
        WHERE id=$3
        RETURNING *
      `, [productId, cartId, id]);
      return cartItem;
  } catch (error) {
    throw error;
  }
}

async function destroyCartItem(id) {
  try {
    const {rows:[cartItem]} = await client.query(`
      DELETE FROM cart_item
      WHERE id=$1
      RETURNING *
    `, [id]);
    return cartItem
  } catch (error) {
    throw error;
  }
}

// async function getTotalCartProductPrice(){
//   try{
//     const { rows: [ totalPrice ] } = await client.query(`
//     SELECT price
//     FROM product;
//     RETURNING *;
//     `)

//     const totalCartPrice = 0;

//     totalPrice.map(price => totalCartPrice+=price)

//     return totalCartPrice;
//   }catch(error){
//     throw error;
//   }
// }



module.exports = {
  // getCartItemById,
  addProductToCart,
  updateCartItem,
  destroyCartItem,
  createCartItem,
  getItemsFromCart
 
};