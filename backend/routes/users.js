var express = require("express");
var router = express.Router();
const { ObjectId } = require("mongodb");

/* GET users listing. */
// Get all users, result without password
router.get("/", function (req, res) {
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
router.post("/", async (req, res) => {
  try {
    const userId = req.body.id;

    if (!userId) {
      return res.status(400).json({ message: "Fel vid hämtning av användar-id" });
    }

    const user = await req.app.locals.db.collection("users").findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ message: "Ingen användare med detta id hittades" });
    }

    // Skicka tillbaka användarobjektet som JSON
    res.json(user);
  } catch (error) {
    console.error("Fel vid hämtning av användare:", error);
    res.status(500).json({ error: "Internt serverfel" });
  }
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

// User login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await req.app.locals.db.collection("users").findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Ingen användare med den e-postadressen hittades." });
    }

    if (password === user.password) {
      return res.status(200).json({ message: `Välkommen ${user.name}! Du är nu inloggad` });
    } else {
      return res.status(401).json({ message: "Fel lösenord. Inloggning misslyckades" });
    }
  } catch (error) {
    console.error("Fel vid användarlogin:", error);
    res.status(500).json({ error: "Internt serverfel" });
  }
});

module.exports = router;
