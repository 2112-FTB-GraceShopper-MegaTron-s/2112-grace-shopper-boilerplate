const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");
const { getUserById } = require("../db");
const JWT_SECRET = process.env.JWT_SECRET || "removeLater"

apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  console.log("IN HEALTH")
  res.send({
    healthy: true,
  });
});

<<<<<<< HEAD
// place your routers here
// hello world
=======

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);
      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ( error ) {
      next(error);
    }
    
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

const cartRouter = require("./cart");
apiRouter.use("/cart", cartRouter);


//  const cartItemRouter = require("./cartItem");
//  apiRouter.use("/cartItem", cartItemRouter);

// const cartRouter = require("./cart");
// apiRouter.use("/cart", cartRouter);

 const productRouter = require("./product");
 apiRouter.use("/product", productRouter);


>>>>>>> a4563d8af345c837da3b281b64a7ae10849ece4b

module.exports = apiRouter;
