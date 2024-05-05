const { CustomHttpError } = require("../utils/customError");

function errorHandler(err, req, res, next) {

    err.httpStatusCode = err.httpStatusCode || 500;
    err.message = err.message || "Internal error";

    //wrong mongodb id error
    if (err.name == "CastError") {
        const message = `Resource not found. Invalid: ${err.path} `;
        err = new CustomHttpError(400, message);
    }
    //mongoose duplicate key //when same email registers
    if (err.code == 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} error `;
        err = new CustomHttpError(400, message);
    }

    res.status(err.httpStatusCode).json({
        success: false,
        message: err.message,
        error: err,
    })
}

module.exports = {
    errorHandler,
};
