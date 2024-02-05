// Creating new router called products
var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  req.app.locals.db
    .collection("products")
    .find()
    .toArray()
    .then((results) => {
      console.log(results);
    });

  res.send("Products funkar!");
});

module.exports = router;
