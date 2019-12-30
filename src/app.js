const http = require("http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const registerRoutes = require("./routes");

const app = express();
app.use(cors());
app.use(bodyParser());
registerRoutes(app);

const server = http.createServer(app);
server.listen(process.env.APP_PORT, () => {
    console.log(
        `Server has been running at http://localhost:${server.address().port}`
    );
});
