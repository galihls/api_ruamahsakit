const express = require("express");
const jwt = require("jsonwebtoken");
const Hospital = require("../models/Entity");
const keys = require("../config").secretOrKey;

const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], keys);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ message: "Token is not valid" });
  }
};

// Mendapatkan semua data
router.get("/", authenticate, (req, res) => {
  Hospital.find()
    .then((hospitals) => res.json(hospitals))
    .catch((err) => res.status(400).json({ message: "Error fetching data" }));
});

// Membuat data baru
router.post("/", authenticate, (req, res) => {
  const newHospital = new Hospital({
    name: req.body.name,
    location: req.body.location,
    capacity: req.body.capacity,
  });

  newHospital
    .save()
    .then((hospital) => res.json(hospital))
    .catch((err) => res.status(400).json({ message: "Error saving data" }));
});

// Mengupdate data berdasarkan ID
router.put("/:id", authenticate, (req, res) => {
  Hospital.findById(req.params.id)
    .then((hospital) => {
      if (!hospital) {
        return res.status(404).json({ message: "Hospital not found" });
      }

      hospital.name = req.body.name;
      hospital.location = req.body.location;
      hospital.capacity = req.body.capacity;

      hospital
        .save()
        .then((hospital) => res.json(hospital))
        .catch((err) =>
          res.status(400).json({ message: "Error updating data" })
        );
    })
    .catch((err) => res.status(400).json({ message: "Error fetching data" }));
});

// Menghapus data berdasarkan ID
router.delete("/:id", authenticate, (req, res) => {
  Hospital.findByIdAndDelete(req.params.id)
    .then((hospital) => {
      if (!hospital) {
        return res.status(404).json({ message: "Hospital not found" });
      }

      res.json({ message: "Hospital deleted" });
    })
    .catch((err) => res.status(400).json({ message: "Error deleting data" }));
});

module.exports = router;
