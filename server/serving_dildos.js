const express = require("express");
const app = express();
const cors = require("cors");
// const helmet = require("helmet");
const PORT = !process.env.PORT ? 9934 : process.env.PORT;
const routingMiddleware = require("./routingMiddleware.js");

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
routingMiddleware(app);
app.use(express.static("client/public"));
// app.use(helmet());

// listen
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
