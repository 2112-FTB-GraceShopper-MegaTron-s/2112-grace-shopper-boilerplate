const client = require("../client");


async function getCartById(cartId) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
        SELECT *
        FROM cart
        WHERE id=$1;
      `,
      [cartId]
    );
    return cart;
  } catch (error) {
    throw error;
  }
}

async function getCartsByUser(userId){
  try{
    const {
      rows: orderHistory
    } = await client.query(`
    SELECT *
    FROM cart
    WHERE "userId" = $1 AND "isPayFor" = true;
    `,[userId]);

    return orderHistory;
  }catch(error){
    throw error
  }
}


async function getAllCarts() {
  try {
    const { rows: cart } = await client.query(`
        SELECT cart.*, users.username AS "creatorName"
        FROM cart
        JOIN users ON users.id=cart."userId";
      `);
    return cart;
  } catch (error) {
    throw error;
  }
}

async function createCart({ userId, isPayFor, price }) {
  try {
    const {
      rows: [cart]
    } = await client.query(
      `
        INSERT INTO cart ("userId", price,"isPayFor") 
        VALUES($1, $2, $3)
        RETURNING*;
      `,
      [userId, price, isPayFor]
    ); 
    return cart;
  } catch (error) {
    throw error;
  }
}

async function updateCart({ id, isPayFor, name, price }) {

  try {
    const fields = {};
    if (price){
      fields.price = price
    }
    if (typeof isPayFor === "boolean"){
      fields.isPayFor = isPayFor
    }
    const setString = Object.keys(fields).map(
      (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');
    const {
      rows: [cart],
    } = await client.query(
      `
        UPDATE cart, price
        SET ${ setString }
        WHERE id=${id}
        RETURNING *
      `, Object.values(fields))
      return cart;
  } catch (error) {
    throw error;
  }
}


async function getTotalCartItemPrice(){
  try{
    const { rows: [ totalPrice ] } = await client.query(`
    SELECT price
    FROM product;
    RETURNING *;
    `)

    const totalCartPrice = 0;

    totalPrice.map(price => totalCartPrice+=price)

    return totalCartPrice;
  }catch(error){
    throw error;
  }
}


async function getCartsByUser(userId){
  try{
    const {
      rows: orderHistory
    } = await client.query(`
    SELECT *
    FROM cart
    WHERE "userId" = $1 AND "isPayFor" = true;
    `,[userId]);

    return orderHistory;
  }catch(error){
    throw error
  }
}



module.exports = {
  getCartById,
  getAllCarts,
  createCart,
  updateCart,
  getTotalCartItemPrice,
  getCartsByUser
  };