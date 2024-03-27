require("dotenv").config();


const renderHome = (req, res) => {
  res.render("web/home");
};

const renderProfile = (req, res) => {
  res.render("web/profile");
};

const renderActivities = (req, res) => {
  res.render("web/activities");
};

const renderSettings = (req, res) => {
  res.render("web/settings");
};

module.exports = {
  renderHome,
  renderProfile,
  renderActivities,
  renderSettings,
};