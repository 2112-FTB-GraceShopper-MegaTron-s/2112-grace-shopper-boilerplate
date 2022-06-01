// grab our db client connection to use with our adapters
const client = require("../client");
const bcrypt = require("bcrypt")

async function createUser({ username, address, email, city, state, zip, password }) {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user]
    } = await client.query(
      `
        INSERT INTO users (username, address, email, city, state, zip, password)
        VALUES($1, $2, $3, $4, $5, $6, $7);
      `,
      [username, address, email, city, state, zip, hashedPassword]
    );
    delete password;
    
    return user;
  } catch (error) {
    throw error;
  }
}
async function getUser({ username, password }) {
  const user = await getUserByUsername(username);
  const hashedPassword = user.password;
  const passwordsMatch = await bcrypt.compare(password, hashedPassword);

    try {
  
      if (!user) {
        return null
      }
      if (passwordsMatch) {
        delete user.password     
      return user;
      }
      else {
        return null
      }    
      } catch (error) {
      throw error;
      }
}

async function getUserById(id) {
  try {
    const { rows: [ user ] } = await client.query(`
      SELECT id, username, password
      FROM users
      WHERE id=$1
    `, [id]);

    if (!user) {
      return null
    }


    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username){
  try{
    const {rows: [user]} = await client.query(`
      SELECT *
      FROM users
      WHERE username=$1
    `, [username]);
    if (!user) {
      return null
    }
      return user;
    } catch (error) {
      throw error;
    }
}


module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  
  
};









