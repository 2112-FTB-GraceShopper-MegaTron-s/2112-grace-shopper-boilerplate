const client = require("../client");
const { isUserAdmin } = require ("./users")



async function getProductById(id) {

    try {
      const { rows: [ product ]  } = await client.query(`
        SELECT *
        FROM product
        WHERE id=$1;
      `, [id]);
  
      return product;
    } catch (error) {
      throw error;
    }
}

async function getAllProducts() {
  try {
    const { rows: product } = await client.query(`
          SELECT *
          FROM product
          WHERE active = true
          ;
          
        `);

    return product;
  } catch (error) {
    throw error;
  }
}

async function createProducts({name, description, pictures, price}){
  try{

    const  {rows : [ product ] } = await client.query(`
      INSERT INTO product (name, description, pictures, price)
      VALUES ($1, $2, $3, $4)
      RETURNING*;
    `, [name, description, pictures, price]);
    return product;
  }catch(error){
    throw error;
  }
}

async function updateProduct({ id, name, description }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        UPDATE product
        SET name=$1, description=$2
        WHERE id=$3
        RETURNING *
      `, [name, description, id])
      return product;
  } catch (error) {
    throw error;
  }
}

async function deleteProduct(productId, userId){
  try{
    let admin = await isUserAdmin(userId);
    console.log(admin.admin)
    if (admin.admin === true ){

    const {
      rows:[product],
    } = await client.query(
      `update product set active = false
      WHERE id=$1
      RETURNING *;
      `,[productId]
    )
    return product
    }

  }catch(error){
 throw error;
  }
}

module.exports = {
  getProductById,
  getAllProducts,
  updateProduct,
  createProducts,
  deleteProduct
};