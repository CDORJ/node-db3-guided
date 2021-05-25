const express = require("express");
const helmet = require("helmet");

const UserRouter = require("./users/user-router.js");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/users", UserRouter);

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "something went wrong" });
});

module.exports = server;
