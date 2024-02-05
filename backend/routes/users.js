var express = require("express");
var router = express.Router();

/* GET users listing. */
// Get all users, result without password
router.get("/", function (req, res, next) {
  req.app.locals.db
    .collection("users")
    .find()
    .toArray()
    .then((result) => {
      const usersWithoutPassword = result.map((user) => {
        const { password, ...usersWithoutPassword } = user;
        return usersWithoutPassword;
      });

      console.log("All users sent");
      res.send(usersWithoutPassword);
    });
});

// Create a new user
router.post("/add", function (req, res) {
  req.app.locals.db
    .collection("users")
    .insertOne(req.body)
    .then((result) => {
      console.log("New user added");
      res.send(result);
    });
});

module.exports = router;
