// Creating a new router called orders
var express = require("express");
var router = express.Router();
const { ObjectId } = require("mongodb");

/* GET orders listing. */
// Get all orders
router.get("/all", function (req, res, next) {
  req.app.locals.db
    .collection("orders")
    .find()
    .toArray()
    .then((results) => {
      console.log(results);
      res.send(results);
    });
});

// Add new order to specifik user
router.post("/add", async (req, res) => {
  try {
    const { user, products } = req.body;
    const userId = new ObjectId(user);

    // Looks for the specific id in collection users
    const userExists = await req.app.locals.db.collection("users").findOne({ _id: userId });

    console.log(userId);

    if (userExists) {
      // If the user exists in the user collection, add new order in orders - connected to that user
      await req.app.locals.db.collection("orders").insertOne({ user, products });

      // Adjust lager quantity of ordered products
      for (const product of products) {
        const { productId, quantity } = product;
        await req.app.locals.db.collection("products").updateOne(
          { _id: new ObjectId(productId) }, // Filter för att hitta rätt produkt baserat på productId
          { $inc: { lager: -quantity } } // Minska lagermängden med quantity
        );
      }
      res.status(201).json({ message: "Ny order har lagts till för existerande kund" });
    } else {
      // If the user doesn't exist in the user collection, add user to user collection + add order to order ceollection

      res.status(400).json({ message: "Användaren finns inte, vänligen registrera dig för att slutföra din order" });
    }
  } catch (error) {
    console.error("Fel vid skapande av ny order:", error);
  }
});

module.exports = router;
