const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "removeLater"
const {
  createUser,
  getUser,
  getCartByUser,
  getUserByUsername,
  
} = require("../db");

const { requireUser } = require("./utils");

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");
  next();
});

usersRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (password.length < 8) {
      throw new Error("Password is too short");
    }
    const _user = await getUserByUsername(username);
    if (_user) {
      throw new Error({ message: "Username already taken" });
    }

    const user = await createUser({
      username,
      password,
    });
    res.send({ user });
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new Error({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    const user = await getUser({ username, password });
    if (user) {
      console.log( JWT_SECRET,"testin secret")
      const token = jwt.sign(
        {
          id: user.id,
          username: username,
        },
        JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );
      res.send({ token });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

usersRouter.get("/me", async (req, res, next) => {
  res.send(req.user);
});

usersRouter.get("/:username/cart", async (req, res, next) => {
  const { username } = req.params;
  try {
      console.log("got here", username);
    const usersCart = await getCartByUser(
      {username: username}
    );
      console.log(usersCart)
    res.send(usersCart);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;