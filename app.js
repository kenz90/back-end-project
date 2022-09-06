const express = require("express");
const { getCategories } = require("./controllers/categories.controllers");
const app = express();

app.get("/api/categories", getCategories);

app.all("/*", (req, res, next) =>{
  res.status(404).send({msg:"not found"})

})

app.use((err, req, res) => {
  console.log(err);
  res.status(500).send({ msg: "internal server error" });
});




module.exports = app;
