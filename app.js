const express = require("express");
const { getCategories } = require("./controllers/categories.controllers");
const { getReviewById } = require("./controllers/reviews.controllers");
const { getUsers } = require("./controllers/users.controllers");
const app = express();

app.get("/api/categories", getCategories);
app.get("/api/reviews/:review_id", getReviewById);
app.get("/api/users", getUsers);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "not found" });
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "bad request" });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});
app.use((err, req, res) => {
 res.status(500).send({ msg: "internal server error" });
});

module.exports = app;
