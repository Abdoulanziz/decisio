require("dotenv").config();

const { 
  User,
  Profile,
  Post,
} = require('../models');


const renderHome = async (req, res) => {
  try {
    // Fetch the user's post data from the database, including the author's full name
    const posts = await Post.findAll({
      include: [{
        model: User,
        attributes: ['fullName'],
      }],
    });


    if (posts && posts.length > 0) {
      // If post data exists, render the post page with the data
      res.render("web/home", { data: { user: req.session.user, posts } });
    } else {
      // If no post data is found, render the post page with user data only
      res.render("web/home", { data: { user: req.session.user } });
    }
  } catch (error) {
    // Log out the error to the console
    console.error('Error fetching post info:', error);

    // Respond with the error to the client
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



const renderProfile = async (req, res) => {
  try {
    // Fetch the user's profile data from the database
    const profile = await Profile.findOne({ where: { userId: req.session.user.userId } });
    if (profile) {
      // If profile data exists, render the profile page with the data
      res.render("web/profile", { data: { user: req.session.user, profile } });
    } else {
      // If no profile data is found, render the profile page with user data only
      res.render("web/profile", { data: { user: req.session.user } });
    }
  } catch (error) {
    // Log out the error to the console
    console.error('Error fetching profile info:', error);

    // Respond with the error to the client
    res.status(500).json({ message: 'Internal Server Error' });
  }
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