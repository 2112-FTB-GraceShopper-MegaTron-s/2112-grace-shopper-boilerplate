const {
  client,
  // declare your model imports here
  // for example, User
 }= require('./');

const {
  createUser,
  // getUser,
  // getUserById,
} = require("./models/users");


const {
  // getCartItemById,
  // addProductToCart,
  // updateCartItem,
  // destroyCartItem,
  createCartItem
} = require("./models/cartItem");


const {
  // getCartById,
  createCart,
  // updateCart,
} = require("./models/cart");




const {
  getProductById,
  getAllProducts,
  createProducts,
} = require("./models/product");






async function dropTables() {
  console.log("Dropping All Tables...");
  // drop all tables, in the correct order
  try {
    await client.query(`  
      DROP TABLE IF EXISTS cart_products;
      DROP TABLE IF EXISTS cart_product;
      DROP TABLE IF EXISTS cart_item;
      DROP TABLE IF EXISTS cart;
      DROP TABLE IF EXISTS product;
      DROP TABLE IF EXISTS users;
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
      username varchar(255) NOT NULL,
      address varchar(255) ,
      email varchar(255) UNIQUE ,
      city varchar(255) ,
      state varchar(255) ,
      zip INTEGER ,
      admin BOOLEAN DEFAULT false,
      password varchar(255) UNIQUE NOT NULL
    );  
    CREATE TABLE product (
      id SERIAL PRIMARY KEY,
      name varchar(255),
      description varchar(255),
      pictures varchar(255),
      active BOOLEAN DEFAULT true,
      price INTEGER
    ); 
    CREATE TABLE cart (
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id) ,
      price INTEGER,
      "isPayFor" BOOLEAN DEFAULT false
    
    );
    CREATE TABLE cart_item (
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES product(id),
      "cartId" INTEGER REFERENCES cart(id),
      quantity INTEGER,
      price INTEGER NOT NULL
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


async function populateInitialUsers() {
  try {
    const userData = [
      { username: "tony", 
       address: "8525 PandaBear Lane", 
       email: "imacuddlePanada@gmail.com", 
       city: "Pandaville", 
       state: "california",
        zip: 75214,
        admin: true,
         password: "blackandwhitealltheway"
    },

    { username: "Sandra", 
     address: "3311 Bamboo Street", 
     email: "IeatPanadasBamboo@gmail.com", 
     city: "bejing", 
     state: "china",
     zip: 84217,
     admin: false,
     password: "bamboofarts"
},

{username: "Rihanna", 
 address: "4444 Sunset Blvd", 
 email: "mylittepony@gmail.com", 
 city: "Sqwiggletown", 
 state: "Oregon",
  zip: 99998,
  admin: true,
   password: "deepfriedpizzarolls"
}
 ]


 const users = await Promise.all(userData.map(createUser))

  console.log("Creating Users");

    console.log("Finished creating populateInitalUsers")

//  const users = await Promise.all(userData.map(populateInitialData));
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
  
  // const user1 = await User.createUser({ ...user info goes here... })

  } catch (error) {
    console.error("Error Creating Users");
    throw error;
  }
}


async function populateProductData() {
  try {
    const productData = [
      { name: "Rocket",
        description: "Trash panda",
        pictures: "/assets/istockphoto-485998252-612x612.jpeg",
        price: 55
    },

    {name: "Gamora",
      description: "Green panda",
      pictures: "/assets/www.rmmagazine.comRM09.17_riskpandasearch-6-e9da4c1ceccb2022c5cfdbb141e07d38fc1342f4.jpg" ,
      price: 1500
    },

    {name: "Groot" ,
      description: "Cursed wooden panda",
      pictures: "/assets/images (1).jpeg" ,
      price: 1000000 
    },

    {name: "Pixel Panda" ,
      description: "Panda eating popcorn NFT",
      pictures: "/assets/download.png" ,
      price: 240000 
    },

    {name: "Polkadotted Panda" ,
    description: "Polkadotted panda plushie",
    pictures: "/assets/il_fullxfull.1578803933_hulz.webp" ,
    price: 130 
    },

    {name: "Panda Coffee Mug" ,
    description: "Beautiful hand crafted mug",
    pictures: "/assets/images (2).jpeg" ,
    price: 22 
    },

    { name: "Red Panda",
    description: "Red panda, not Disney",
    pictures: "/assets/Ming-Yue-exploring-1024x576.jpeg",
    price: 55000
    },

    {name: "Vintage Panda POG",
      description: "Panda POG from the 90's",
      pictures: "/assets/12-POG-Panda.png" ,
      price: 15
    },
    
    {name: "Panda Lamp" ,
    description: "The perfect panda lamp",
    pictures: "/assets/Pillowfort-Panda-Table-Lamp.webp" ,
    price: 150
    },
    
    {name: "Panda Chair" ,
    description: "AP Collection panda chair",
    pictures: "/assets/ap-collection-panda-chair.jpeg" ,
    price: 14000
    },

    {name: "Panda Poncho" ,
      description: "One size fits most",
      pictures: "/assets/1_330d4338-1b04-465f-babf-ec7b59814b7d_large.webp" ,
      price: 120
    },

    {name: "Panda Bag " ,
      description: "by Throm Browne ",
      pictures: "/assets/thom-browne-black-and-white-pebble-grain-leather-panda-bag_16702292_34082038_800.webp" ,
      price: 5000
    },
 ]
 
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
  
  // const user1 = await User.createUser({ ...user info goes here... })
  console.log("populateProductData");
    // console.log(products);
  const products = await Promise.all(productData.map(createProducts)) 
    console.log("Finished creating populateProductData")
  } catch (error) {
    console.error("Error Creating Products")
    throw error;
  }
}
async function populateCartData () {
  try{
    const cartData = [
      { userId : 1,
        price: 55,        
        isPayFor: true
    },
    { userId : 2,
      price: 109,        
      isPayFor: false
  },
  { userId : 3,
    price: 98,        
    isPayFor: true
  }
 ]

    console.log("populateCartData");
    // console.log(products);
  const carts = await Promise.all(cartData.map(createCart)) 
    console.log("Finished creating CartData")
  }catch(error){
    console.error("error Building Cart Data")
    throw error;
  }
}

async function populateCartItemData(){
  try{
    const cartItemData = [
      { productId : 1,
        cartId: 1,        
        quantity: 10,
        price: 5500
    },
    { productId : 1,
      cartId: 2,        
      quantity: 32,
      price: 1760
    },
    { productId : 3,
      cartId: 2,        
      quantity: 1,
      price: 1000000
    },
    { productId : 2,
      cartId: 3,        
      quantity: 130,
      price: 19500
    }
 ]
 console.log("Creating cart_item table!")
const cartItem = await Promise.all(cartItemData.map(createCartItem)) 
  console.log("finished creating cart_item table!")
  }catch(error){
    console.error("error Building cart_item")
    throw error;
  }
}


async function buildTables() {
  try {
    client.connect();
    console.log("client has been connected")
    await dropTables();
    await createTables();
   
  } catch (error) {
    throw error;
  }
}


buildTables()
  .then(populateInitialUsers)
  .then(populateProductData)
  .then(populateCartData)
  .then(populateCartItemData)
  .catch(console.error)
  .finally(() => client.end());

  module.exports = {
    buildTables,
    createTables,
    dropTables,
  }