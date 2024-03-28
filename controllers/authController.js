require("dotenv").config();
const Sequelize = require('sequelize');
const models = require('../models');
const bcrypt = require("bcrypt");
const { User } = require('../models');
const { Role } = require('../models');

const createAuditLog = require('../middlewares/auditLogger');


const renderSignup = (req, res) => {
  res.render("auth/signup");
};

const handleSignup = async (req, res) => {
try {
    // Extract user data from the request body
    const { fullName, accountType, email, password } = req.body;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already used!' });
    }

    // Hash and salt the user securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record in the database
    const newUser = await User.create({ fullName, accountType, roleId: 3, email, password: hashedPassword });

    // Create an audit log
    await createAuditLog('User', newUser.userId, 'CREATE', {}, newUser.dataValues, newUser.userId);

    res.redirect("/auth/signin");

    // Respond with the newly created user object
    // return res.status(201).json({ status: 'success', message: 'User record created successfully', data: newUser });

  } catch (error) {
    // Log out the error to the console
    console.error('Error creating user:', error);

    res.redirect("/auth/signup");

    // Respond with the error to the client
    // return res.status(500).json({ message: 'Internal Server Error' });
  }
};


const renderSignin = (req, res) => {
  res.render("auth/signin");
};

const handleSignin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email/*, accountStatus: "active"*/ }});

    if (!user) {
      res.redirect("/auth/signin");
      return;
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
      // Store the current lastLogin in the session before updating it
      const previousLastLogin = user.lastLogin || new Date();

      // Update lastLogin field
      await user.update({ lastLogin: new Date() });


      // Include lastLogin in the session user data
      req.session.user = {
        ...user.dataValues,
        lastLogin: previousLastLogin,
      };


      // Create an audit log
      await createAuditLog('User', user.dataValues.userId, 'SIGNIN SUCCESSFUL', {}, user.dataValues, req.session.user.userId);

      user.roleId === 2 ? res.redirect("/admin/dashboard") : res.redirect("/web/home");

    } else {
      res.redirect("/auth/signin");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const renderPasswordResetRequest = (req, res) => {
  res.render("auth/password-reset-request");
};

const handlePasswordResetRequest = async (req, res) => {
  // TODO: logic for password reset request
};


const renderPasswordReset = (req, res) => {
  res.render("auth/password-reset");
};

const handlePasswordReset = async (req, res) => {
  // TODO: logic for password reset
};


const handleSignout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("Signout error:", error);
      res.status(500).json({ success: false, message: "Signout error" });
    } else {
      res.clearCookie("mis.connect.sid", { path: "/", expires: new Date(1) });
      res.redirect("/auth/signin");
      // res.status(200).json({ success: true });
    }
  });
};

module.exports = {
  renderSignup,
  handleSignup,

  renderSignin,
  handleSignin,

  renderPasswordResetRequest,
  handlePasswordResetRequest,

  renderPasswordReset,
  handlePasswordReset,

  handleSignout,
};
