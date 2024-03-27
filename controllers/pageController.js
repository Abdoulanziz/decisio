require("dotenv").config();


const renderIndex = (req, res) => {
  res.render("pages/index");
};

module.exports = {
  renderIndex,
};
