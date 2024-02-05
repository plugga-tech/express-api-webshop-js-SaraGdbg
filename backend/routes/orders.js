// Creating a new router called orders
var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/all", function (req, res, next) {
  req.app.locals.db
    .collection("orders")
    .find()
    .toArray()
    .then((results) => {
      console.log(results);
    });

  res.send("Orders funkar!");
});

module.exports = router;
