var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// Gör routerna till variabler som används i app.use
const indexRouter = require("./routes/index");
const ordersRouter = require("./routes/orders");
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");

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
app.use("api/users", usersRouter);

module.exports = app;
