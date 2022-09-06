const { selectAllTopics } = require("../models/categories.models");

exports.getCategories = (req, res) => {
 selectAllTopics().then((categories) => {
    res.status(200).send({ categories });
  }).catch();
};
