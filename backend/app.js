var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// Creates variables from the routers, to use in app.js
const indexRouter = require("./routes/index");
const ordersRouter = require("./routes/orders");
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");

// Impport MongoDB
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://127.0.0.1:27017").then((client) => {
  console.log("Vi är uppkopplade mot databasen!");

  const db = client.db("sara-gadeberg");
  app.locals.db = db;
});

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Kopplar ihop routers med app.js
app.use("/", indexRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);

module.exports = app;
