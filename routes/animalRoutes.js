const express = require("express");
const router = express.Router();
const animalController = require("../controllers/animalController");

router.post("/animal",animalController.addAnimal)
router.route("/animal/:id").put(animalController.updateAnimal).delete(animalController.deleteAnimal);
router.get("/animals",animalController.getAllAnimals)

module.exports = router;
