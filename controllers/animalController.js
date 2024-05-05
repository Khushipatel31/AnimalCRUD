const animals = require("../model/animal");
const { CustomHttpError } = require("../utils/customError");
const catchAsyncErrors = require("../middleware/catchAsyncError");

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

module.exports = {
    addAnimal
};
