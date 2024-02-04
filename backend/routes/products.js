// Creating new router called products
var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Products funkar!");
});

module.exports = router;
