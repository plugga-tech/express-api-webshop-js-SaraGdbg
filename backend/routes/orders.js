// Creating a new router called orders
var express = require("express");
var router = express.Router();

/* GET orders listing. */
// Get all orders
router.get("/all", function (req, res, next) {
  req.app.locals.db
    .collection("orders")
    .find()
    .toArray()
    .then((results) => {
      console.log(results);
      res.send(results);
    });
  // DELETE if everything works
  // res.send(results);
});

module.exports = router;
