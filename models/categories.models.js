const db = require("../db/connection");
exports.selectAllTopics = () => {
  return db.query("SELECT * FROM categories;").then((res) => {
    return res.rows;
  });
};
