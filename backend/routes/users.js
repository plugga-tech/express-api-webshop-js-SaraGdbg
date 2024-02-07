var express = require("express");
var router = express.Router();
const { ObjectId } = require("mongodb");

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

// Get specific user

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

// User login
router.post("/login", function (req, res) {
  // get all users
  // compare req.body.name to find the user who is trying to log in
  // compare req.body.password to that specifik user
  // respond log in message

  // req.app.locals.db
  //   .collection("users")
  //   .insertOne(req.body)
  //   .then((result) => {
  //     console.log("New user added");
  res.send(result);
  //  });
});

module.exports = router;
