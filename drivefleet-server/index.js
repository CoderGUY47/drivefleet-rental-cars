// Vercel serverless integration settings
// Role modification and profile administration
// Reservation processing endpoints
// Vehicles pagination and search query processing
// JWKS authentication gatekeeper
// MongoDB client and cluster connection validation
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

// verify token middleware using only const and descriptive Banglish variable names
const verifyToken = async (request, response, next) => {
  const authChabi = request.headers.authorization;
  const mathaToken = (authChabi && authChabi.startsWith("Bearer ")) 
    ? authChabi.split(" ")[1] 
    : null;

  const biskutHeader = request.headers.cookie;
  const sobBiskut = biskutHeader 
    ? biskutHeader.split(";").reduce((accumulator, cookieString) => {
        const [cookieKey, cookieValue] = cookieString.trim().split("=");
        accumulator[cookieKey] = cookieValue;
        return accumulator;
      }, {}) 
    : {};
  
  const biskutToken = sobBiskut["token"] || null;
  const choltiToken = mathaToken || biskutToken;

  if (!choltiToken) {
    return response.status(401).json({ message: "Unauthorized: No token provided" });
  }

  // Verify the active token
  try {
    // Attempt local JWT secret validation first (cookie-based flow)
    try {
      const khojaUser = jwt.verify(choltiToken, process.env.JWT_SECRET || "drivefleet_jwt_secret_key");
      request.user = khojaUser;
      return next();
    } catch (jwtBhul) {
      // Fallback: Validate with JWKS signature directory (Better Auth token flow)
      const { payload: jwksUser } = await jwtVerify(choltiToken, JWKS);
      request.user = jwksUser;
      return next();
    }
  } catch (authBhul) {
    return response.status(403).json({ message: "Forbidden: Invalid token" });
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

// login endpoint - generates JWT token and stores in HTTPOnly cookie
app.post("/api/auth/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).json({ error: "Email and password are required" });
    }

    // Find authenticated user record in database
    const milDeyaUser = await usersCollection.findOne({ email });
    if (!milDeyaUser) {
      return response.status(401).json({ error: "Invalid credentials" });
    }

    // Generate signed JWT token
    const bananoToken = jwt.sign(
      { 
        id: milDeyaUser._id.toString(), 
        email: milDeyaUser.email, 
        name: milDeyaUser.name,
        role: milDeyaUser.role || "user"
      },
      process.env.JWT_SECRET || "drivefleet_jwt_secret_key",
      { expiresIn: "7d" }
    );

    // Set secure, HTTPOnly cookie in response headers
    const surokkitoBiskut = process.env.NODE_ENV === "production" ? "Secure;" : "";
    response.setHeader(
      "Set-Cookie",
      `token=${bananoToken}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax; ${surokkitoBiskut}`
    );

    response.json({ 
      message: "Login successful", 
      user: { 
        id: milDeyaUser._id, 
        email: milDeyaUser.email, 
        name: milDeyaUser.name, 
        role: milDeyaUser.role 
      } 
    });
  } catch (loginBhul) {
    response.status(500).json({ error: "Authentication failed" });
  }
});

// logout endpoint - clears the HTTPOnly token cookie
app.post("/api/auth/logout", (request, response) => {
  const surokkitoBiskut = process.env.NODE_ENV === "production" ? "Secure;" : "";
  response.setHeader(
    "Set-Cookie",
    `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; ${surokkitoBiskut}`
  );
  response.json({ message: "Logged out successfully" });
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

app.post("/booking", verifyToken, async (request, response) => {
  try {
    const notunBooking = request.body;
    const bookingResult = await bookingsCollection.insertOne(notunBooking);

    // Increment bookingCount and booking_count on the matching car using $inc
    const gariId = notunBooking.carId;
    const thikId = ObjectId.isValid(gariId);
    const gariKhujo = thikId
      ? { _id: new ObjectId(gariId) } 
      : { id: gariId };

    await carsCollection.updateOne(
      gariKhujo,
      { 
        $inc: { 
          bookingCount: 1, 
          booking_count: 1 
        } 
      }
    );

    response.status(201).json(bookingResult);
  } catch (bookingBhul) {
    response.status(500).json({ error: "Failed to create booking" });
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
