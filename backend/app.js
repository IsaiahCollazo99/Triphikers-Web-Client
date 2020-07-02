const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((error, req, res, next) => {
    console.log(error);
    if(error.status) {
        res.status(error.status).json(error);
    } else {
        res.status(500).json(error);
    }
});

app.get("*", (req, res, next) => {
    res.status(404).json({
        status: 404,
        error: "No route found."
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`)
})