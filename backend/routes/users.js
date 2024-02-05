var express = require("express");
var router = express.Router();

/* GET users listing. */
// Get all users
router.get("/", function (req, res, next) {
  req.app.locals.db
    .collection("users")
    .find()
    .toArray()
    .then((results) => {
      const usersWithoutPassword = results.map((user) => {
        const { password, ...usersWithoutPassword } = user;
        return usersWithoutPassword;
      });

      console.log(usersWithoutPassword);
    });

  res.send("Users funkar!");
});

// Create a new user
router.post("/add", function (req, res) {
  req.app.locals.db
    .collection("users")
    .insertOne(req.body)
    .then((result) => {
      console.log(result);
    });
});

module.exports = router;
