/* Import Module */
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const multer = require("multer");
const dotenv = require("dotenv");
const path = require("path");

/* Load Router  */
const authRouter = require("./router/auth");
const postsRouter = require("./router/posts");
const usersRouter = require("./router/users");
const userProfileRouter = require("./router/userprofile");
const verifyBearerToken = require("./helper/verifyBearerToken");

/* Connect Env */
dotenv.config();

/**
 * Connect MongoDB
 */
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("connect mongodb bos"))
  .catch((err) => console.log(err));

/* App use module */
app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("dev"));
app.use(express.json());

/* Use Router */
app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);
app.use("/api/userprofile", userProfileRouter);

/* Check Token */
app.get("/api/checkToken", verifyBearerToken, (req, res) => {
  res.status(200).send("Token is valid");
});

/* Set Port */
const port = process.env.PORT || 1000;

/* Listen Application */
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
