// Creating a new router called orders
var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Orders funkar!");
});

module.exports = router;
