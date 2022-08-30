const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");


const hospitalRouter = require("./hospitals");
app.use(cors());
app.use(express.json());

app.use(hospitalRouter);

app.listen(3000, () => {
  console.log("listening at 3000 port ");
});


