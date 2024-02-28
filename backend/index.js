const express = require("express");
const app = express();
const cors=require("cors");
const bodyParser=require('body-parser')
app.use(cors())
app.use(bodyParser.json())

const mainRouter = require('./routes/index')



app.use("/api/v1",mainRouter)
console.log("running")

app.listen(3000)