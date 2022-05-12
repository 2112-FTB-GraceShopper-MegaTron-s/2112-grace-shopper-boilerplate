const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');





async function dropTables() {
  console.log("Dropping All Tables...");
  // drop all tables, in the correct order
  try {
    await client.query(`
    
      DROP TABLE IF EXISTS cart;
      DROP TABLE IF EXISTS product;
      DROP TABLE IF EXISTS user;
    `);
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}



async function createTables() {
  console.log("Starting to build tables...");
  // create all tables, in the correct order
  try {
    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      firstname varchar(255) UNIQUE NOT NULL,
      lastname varchar(255) UNIQUE NOT NULL,
      address1 varchar(255) NOT NULL,
      email varchar(255) NOT NULL,
      city varchar(255) NOT NULL,
      zip varchar(255) NOT NULL,
      password varchar(255) NOT NULL
    );  

    CREATE TABLE product (
      id SERIAL PRIMARY KEY,
      name varchar(255)  NOT NULL,
      description varchar(255) NOT NULL
      pictures varchar(255)  NOT NULL,
      price double  NOT NULL,
    ); 

    CREATE TABLE cart (
      id SERIAL PRIMARY KEY,
      user varchar(255)  NOT NULL,
      price double NOT NULL,
      "isPayFor" BOOLEAN DEFAULT false,
    
    );

    CREATE TABLE cart_product (
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES product(id),
      "cartId" INTEGER REFERENCES cart(id),
      quantity INTEGER,
      price double NOT NULL,
    ); 




    `);
  } catch (error) {
    //hash passwords on users^ ??
    //uniqueness on activities ^ ??
    //"publish routine" button on page to make routine public^
    console.error("Error creating tables.");
    throw error;
  }
}



async function createInitialUsers() {
  console.log("Starting to create users...");
  try {
    const usersToCreate = [
      { firstname: "Tony", Lastname: "Ayala", a },
      { username: "sandra", password: "sandra123" },
      { username: "glamgal", password: "glamgal123" },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

















async function buildTables() {
  try {
    client.connect();



    // drop tables in correct order

    // build tables in correct order
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
