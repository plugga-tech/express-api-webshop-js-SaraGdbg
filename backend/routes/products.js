// Creating new router called products
var express = require("express");
var router = express.Router();
const { ObjectId } = require("mongodb");

/* GET products listing. */
// Get all products
router.get("/", function (req, res, next) {
  req.app.locals.db
    .collection("products")
    .find()
    .toArray()
    .then((result) => {
      console.log("All products sent");
      res.send(result);
    });
});

// Create a new product - inte klar!
router.post("/add", function (req, res) {
  req.app.locals.db
    .collection("products")
    .insertOne(req.body)
    .then((result) => {
      console.log("New product added");
      res.send(result);
    });
});

// Get specific product
router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await req.app.locals.db.collection("products").findOne({ _id: new ObjectId(productId) });

    if (!product) {
      return res.status(404).json({ message: "Ingen produkt med detta id hittade i databasen" });
    }

    // Send the user back as JSON-object
    res.json(product);
  } catch (error) {
    console.error("Fel vid hämtning av produkt:", error);
    res.status(500).json({ error: "Internt serverfel" });
  }
});

module.exports = router;
