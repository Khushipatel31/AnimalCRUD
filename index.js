const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { errorHandler } = require("./middleware/errorHandling");
const routes = require("./routes/animalRoutes");
const bodyParser = require('body-parser');
dotenv.config();

const port = process.env.PORT || 3001;
const app = express();
app.use(bodyParser.json());
app.use(cors({ maxAge: 3600 }));
app.use(express.urlencoded({ extended: false }));


app.use("/", routes);

require("./utils/dbConfig").getDBConnection();
app.use(errorHandler)//error handling

const server = app.listen(port, () => {
    console.log(`Server is running at port ${port} `);
});
