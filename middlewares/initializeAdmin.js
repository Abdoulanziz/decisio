require("dotenv").config();
const bcrypt = require('bcrypt');
const { User } = require('../models');

const { ADMIN_FULLNAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

async function initializeAdmin() {
  try {
    const adminFullName = ADMIN_FULLNAME;
    const adminEmail = ADMIN_EMAIL;
    const adminPassword = ADMIN_PASSWORD;
    
    // Check if the admin user already exists
    const existingAdmin = await User.findOne({ where: { email: adminEmail } });
    if (existingAdmin) {
      console.log('Admin user already exists. Skipping creation.');
      return;
    }

    // Hash and salt the admin password securely
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create the initial admin user
    await User.create({
      fullName: adminFullName,
      accountType: "individual",
      email: adminEmail,
      password: hashedPassword,
      roleId: 2,
      accountStatus: "active"
    });

    console.log('Admin account created successfully.');
  } catch (error) {
    console.error('Error creating admin account:', error);
  }
}

module.exports = initializeAdmin;
