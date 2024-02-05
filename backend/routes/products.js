// Creating new router called products
var express = require("express");
var router = express.Router();

/* GET products listing. */
// Get all products
router.get("/", function (req, res, next) {
  req.app.locals.db
    .collection("products")
    .find()
    .toArray()
    .then((result) => {
      console.log("All products sent");
      res.send(result);
    });
});

// Create a new product - inte klar!
router.post("/add", function (req, res) {
  req.app.locals.db
    .collection("products")
    .insertOne(req.body)
    .then((result) => {
      console.log("New product added");
      res.send(result);
    });
});

module.exports = router;
