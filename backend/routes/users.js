var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  req.app.locals.db
    .collection("users")
    .find()
    .toArray()
    .then((results) => {
      console.log(results);
    });

  res.send("Users funkar!");
});

module.exports = router;
