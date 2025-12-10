// routes/tripRoutes.js
const express = require("express");
const Trip = require("../models/Trip");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// All routes below need auth
router.use(authMiddleware);

// GET /api/trips - get all trips of logged-in user
router.get("/", async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(trips);
  } catch (err) {
    console.error("Get trips error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/trips - create new trip
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const trip = await Trip.create({
      ...data,
      userId: req.user.userId,
    });
    res.status(201).json(trip);
  } catch (err) {
    console.error("Create trip error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/trips/:id - get single trip
router.get("/:id", async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!trip) return res.status(404).json({ message: "Trip not found" });

    res.json(trip);
  } catch (err) {
    console.error("Get trip error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/trips/:id - update trip
router.put("/:id", async (req, res) => {
  try {
    const updated = await Trip.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Trip not found" });

    res.json(updated);
  } catch (err) {
    console.error("Update trip error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/trips/:id - delete trip
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Trip.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!deleted) return res.status(404).json({ message: "Trip not found" });

    res.json({ message: "Trip deleted" });
  } catch (err) {
    console.error("Delete trip error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
