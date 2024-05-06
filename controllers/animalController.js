const animals = require("../model/animal");
const { CustomHttpError } = require("../utils/customError");
const catchAsyncErrors = require("../middleware/catchAsyncError");

//adding new animal
const addAnimal = catchAsyncErrors(async (req, res, next) => {
    const { name, species, habitat, diet, lifespan, image } = req.body;
    if (!name || !species || !habitat || !diet || !lifespan) {
        return next(new CustomHttpError(400, "Please enter all data"));
    }
    try {
        const animal = await animals.create({
            name,
            species,
            habitat,
            diet,
            lifespan,
        });
        console.log("Animal created successfully:", animal);
        res.status(201).json({ message: "Animal created successfully", animal });
    } catch (error) {
        console.error("Failed to create new animal:", error);
        return next(new CustomHttpError(500, "Failed to create new animal"));
    }
});

//updating animal
const updateAnimal = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { name, species, habitat, diet, lifespan, image } = req.body;
    if (!name || !species || !habitat || !diet || !lifespan) {
        return next(new CustomHttpError(400, "Please enter all data"));
    }
    try {
        const updatedAnimal = await animals.findByIdAndUpdate(
            id,
            { name, species, habitat, diet, lifespan, image },
            { new: true }
        );
        if (!updatedAnimal) {
            return next(new CustomHttpError(404, "Animal not found"));
        }
        console.log("Animal updated successfully:", updatedAnimal);
        res.status(200).json({ message: "Animal updated successfully", updatedAnimal });
    } catch (error) {
        console.error("Failed to update animal:", error);
        return next(new CustomHttpError(500, "Failed to update animal"));
    }
});

//deleting animal
const deleteAnimal = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    try {
        const animal = await animals.findById(id);
        if (!animal) {
            return res.status(404).json({ error: "No Animal found with that ID" });
        }
        await animals.findByIdAndDelete(id);
        res.status(200).json({ message: "Animal deleted successfully", deletedAnimal: animal });
    } catch (error) {
        console.error("Failed to delete animal:", error);
        return next(new CustomHttpError(500, "Failed to delete animal"));
    }
});

//getting all animals
const getAllAnimals = catchAsyncErrors(async (req, res, next) => {
    const allAnimals = await animals.find({});
    res.status(200).json({
        success: true,
        count: allAnimals.length,
        animals: allAnimals
    });
});

module.exports = {
    addAnimal,
    getAllAnimals,
    updateAnimal,
    deleteAnimal
};
