// Root endpoint initialization
// Initialization of Express gateway
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const { createRemoteJWKSet, jwtVerify } = require("jose");

const uri = process.env.MONGODB_URI;
const app = express();
const PORT = process.env.PORT || 5000;

// setup global cors and json body parsing middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());

// create a mongo client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// define database collections at the top level
const db = client.db("drivefleet");
const carsCollection = db.collection("cars");
const bookingsCollection = db.collection("bookings");
const usersCollection = db.collection("user");

// initialize jwks from auth server
const JWKS = createRemoteJWKSet(
  new URL(`${process.env.CLIENT_URL}/api/auth/jwks`),
);

// verify token middleware
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized token" });
  }

  try {
    const { payload } = await jwtVerify(token, JWKS);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden" });
  }
};

// asynchronous connection starter
async function run() {
  try {
    // connect the client to the server
    await client.connect();
    // send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } catch (error) {
    console.error("Database connection failed on startup:", error);
  }
}

// start database connection asynchronously
run().catch(console.dir);

// root route
app.get("/", (req, res) => {
  res.send("DriveFleet server is running");
});

// database connected routes
app.get("/featured", async (req, res) => {
  try {
    const featuredCars = await carsCollection.find({}).limit(6).toArray();
    res.json(featuredCars);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch featured cars" });
  }
});

app.get("/cars", verifyToken, async (req, res) => {
  try {
    const { search, category, sort } = req.query;
    let query = {};
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }
    if (category && category !== "All") {
      query.category = category;
    }

    let cars = await carsCollection.find(query).toArray();

    if (sort === "price_asc") {
      cars.sort((a, b) => {
        const p1 =
          parseFloat(String(a.price || 0).replace(/[^0-9.]/g, "")) || 0;
        const p2 =
          parseFloat(String(b.price || 0).replace(/[^0-9.]/g, "")) || 0;
        return p1 - p2;
      });
    } else if (sort === "price_desc") {
      cars.sort((a, b) => {
        const p1 =
          parseFloat(String(a.price || 0).replace(/[^0-9.]/g, "")) || 0;
        const p2 =
          parseFloat(String(b.price || 0).replace(/[^0-9.]/g, "")) || 0;
        return p2 - p1;
      });
    } else {
      // Default: newest first (_id descending)
      cars.sort((a, b) => b._id.toString().localeCompare(a._id.toString()));
    }

    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cars" });
  }
});

app.get("/my-cars/:email", verifyToken, async (req, res) => {
  try {
    const email = req.params.email;
    const query = { ownerEmail: email };
    const cars = await carsCollection.find(query).sort({ _id: -1 }).toArray();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user's cars" });
  }
});

app.get("/cars/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    let car = null;
    try {
      car = await carsCollection.findOne({ _id: new ObjectId(id) });
    } catch (_) {}
    if (!car) {
      car = await carsCollection.findOne({ id });
    }
    if (!car) return res.status(404).json({ error: "Car not found" });
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch car" });
  }
});

app.post("/car", verifyToken, async (req, res) => {
  try {
    const newCar = req.body;
    const result = await carsCollection.insertOne(newCar);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create car" });
  }
});

app.patch("/car/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = { ...req.body };
    delete updateData._id; // prevent modifying immutable _id field
    const query = { _id: new ObjectId(id) };
    const updateDoc = {
      $set: updateData,
    };
    const result = await carsCollection.updateOne(query, updateDoc);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to update car" });
  }
});

app.delete("/car/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await carsCollection.deleteOne(query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete car" });
  }
});

app.post("/booking", verifyToken, async (req, res) => {
  try {
    const newBooking = req.body;
    const result = await bookingsCollection.insertOne(newBooking);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create booking" });
  }
});

app.get("/booking/:userId", verifyToken, async (req, res) => {
  try {
    const userId = req.params.userId;
    const query = { userId: userId };
    const bookings = await bookingsCollection.find(query).toArray();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

app.delete("/booking/:bookingId", verifyToken, async (req, res) => {
  try {
    const id = req.params.bookingId;
    const query = { _id: new ObjectId(id) };
    const result = await bookingsCollection.deleteOne(query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete booking" });
  }
});

// all users
app.get("/users", async (req, res) => {
  try {
    const users = await usersCollection.find({}).toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// delete user by id
app.delete("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const query = { _id: new ObjectId(userId) };
    const result = await usersCollection.deleteOne(query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// update user role
app.put("/users/:userId/role", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { role } = req.body;
    const query = { _id: new ObjectId(userId) };
    const updateDoc = {
      $set: { role },
    };
    const result = await usersCollection.updateOne(query, updateDoc);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user role" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
