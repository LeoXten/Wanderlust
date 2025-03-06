const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js"); 

const app = express();
app.use(express.json()); 

// Connect to MongoDB
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
  console.log("Connected to DB");
}

main().catch((err) => console.log(err));

// Root route
app.get("/", (req, res) => {
  console.log("Hi, I am root");
  res.send("Welcome to Wanderlust API!");
});

// Test route to create a sample listing
app.get("/testListing", async (req, res) => {
  try {
    let sampleListing = new Listing({
      title: "My new Villa",
      description: "By the beach",
      price: 100000,
      location: "Telengat, Goa",
      country: "India",
    });

    await sampleListing.save();
    console.log("Sample listing was saved");
    res.send("Successfully saved!");
  } catch (error) {
    console.error("Error saving listing:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
