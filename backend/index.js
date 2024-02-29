const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Router
const mainRouter = require('./routes/index');
app.use("/api/v1", mainRouter);

// Server start
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
