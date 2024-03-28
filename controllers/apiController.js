const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const models = require('../models');

const { 
  User,
  Profile,
  Post,
  AuditLog,
} = require('../models');


const Op = Sequelize.Op;
const createAuditLog = require('../middlewares/auditLogger');

// Check API status
const checkAPIStatus = (req, res) => {
  res.status(200).json({ message: "The backend API is running" });
};

// Create a new user
const createUser = async (req, res) => {
  try {
    // Extract user data from the request body
    const { username, password, roleId } = req.body;

    // Check if the username already exists in the database
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Hash and salt the user securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record in the database
    const newUser = await User.create({ username, password: hashedPassword, roleId });

    // Create an audit log
    // await createAuditLog('User', newUser.userId, 'CREATE', {}, newUser.dataValues, req.session.user.userId);

    // Respond with the newly created user object
    return res.status(201).json({ status: 'success', message: 'User record created successfully', data: newUser });

  } catch (error) {
    // Log out the error to the console
    console.error('Error creating user:', error);

    // Respond with the error to the client
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    // Extract user data from the request body
    const { roleId, userAccountStatus } = req.body;
    const userId = req.params.id;


    // Check if the user already exists in the database
    const existingUser = await User.findOne({ where: { userId } });

    if (!existingUser) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    // Update the user record in the database
    const updatedUser = await existingUser.update({
      roleId,
      accountStatus: userAccountStatus
    });

    // Create an audit log
    // await createAuditLog('User', userId, 'UPDATE', existingUser.dataValues, updatedUser.dataValues, req.session.user.userId);

    // Respond with the updated user object
    return res.status(200).json({ status: 'success', message: 'User record updated successfully', data: updatedUser });

  } catch (error) {
    // Log out the error to the console
    console.error('Error updating user:', error);

    // Respond with the error to the client
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Fetch users
const fetchUsers = async (req, res) => {
  try {
    const draw = req.query.draw;
    const start = parseInt(req.query.start);
    const length = parseInt(req.query.length);
    const searchValue = req.query.search.value;
    const orderColumnIndex = req.query.order[0].column;
    const orderDirection = req.query.order[0].dir;
    const minDate = req.query.minDate;
    const maxDate = req.query.maxDate;

    const filter = {};
    const sort = [];

    if (searchValue) {
      filter[Op.or] = [
        { firstName: { [Op.iLike]: `%${searchValue}%` } },
        { lastName: { [Op.iLike]: `%${searchValue}%` } },
        // Add more columns to search here as needed
      ];
    }

    if (minDate && maxDate) {
      filter.createdAt = {
        [Op.between]: [new Date(minDate), new Date(maxDate)],
      };
    }

    // Define the column mappings for sorting
    const columnMappings = {
      0: 'user_id', // Map column 0 to the 'id' column
      // Add mappings for other columns as needed
    };

    // Check if the column index is valid and get the column name
    const columnData = columnMappings[orderColumnIndex];
    if (columnData) {
      sort.push([columnData, orderDirection]);
    }
    
    // Construct the Sequelize query
    const queryOptions = {
      where: filter,
      offset: start,
      limit: length,
      order: sort,
      include: [
        {
          model: models.Role,
          attributes: ['roleName'],
        },
      ],
    };

    const result = await User.findAndCountAll(queryOptions);


    // Access the role's fields in each user result
    const usersWithRoles = result.rows.map((user) => ({
      // Extract fields from the 'Role' model
      userRole: user.Role.roleName,
      userId: user.userId,
      userAccountStatus: user.accountStatus,
      userProfileCompletionStatus: user.profileCompletionStatus,
      username: user.username,
      password: user.password,
      roleId: user.roleId,
      createdAt: user.createdAt,
    }));

    return res.status(200).json({
      draw: draw,
      recordsTotal: result.count,
      recordsFiltered: result.count,
      data: usersWithRoles,
    });
    
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Fetch audit logs
const fetchAuditLogs = async (req, res) => {
  try {
    const draw = req.query.draw;
    const start = parseInt(req.query.start);
    const length = parseInt(req.query.length);
    const searchValue = req.query.search.value;
    const orderColumnIndex = req.query.order[0].column;
    const orderDirection = req.query.order[0].dir;
    const minDate = req.query.minDate;
    const maxDate = req.query.maxDate;

    const filter = {};

    const sort = [];

    if (searchValue) {
      filter[Op.or] = [
        { '$User.username$': { [Op.iLike]: `%${searchValue}%` } },
        // Add more columns to search here as needed
      ];
    }

    if (minDate && maxDate) {
      filter.createdAt = {
        [Op.between]: [new Date(minDate), new Date(maxDate)],
      };
    }

    // Define the column mappings for sorting
    const columnMappings = {
      0: 'audit_log_id', // Map column 0 to the 'id' column
      // Add mappings for other columns as needed
    };

    // Check if the column index is valid and get the column name
    const columnData = columnMappings[orderColumnIndex];
    if (columnData) {
      sort.push([columnData, orderDirection]);
    }
    
    // Construct the Sequelize query
    const queryOptions = {
      where: filter,
      offset: start,
      limit: length,
      order: sort,
      include: [
        {
          model: models.User,
          attributes: ['username'],
        },
      ],
    };

    const result = await AuditLog.findAndCountAll(queryOptions);

    // Access the user's fields in each audit log result
    const auditLogsWithUserData = result.rows.map((auditLog) => ({
      // Extract fields from the 'user' association
      auditLogCreatedAt: auditLog.createdAt,
      username: auditLog.User.username,
      auditLogAction: auditLog.action,
      auditLogEntity: auditLog.entityName,
    }));

    return res.status(200).json({
      draw: draw,
      recordsTotal: result.count,
      recordsFiltered: result.count,
      data: auditLogsWithUserData,
    });
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};





const createPersonalDetails = async (req, res) => {
  try {
    // Extract user data from the request body
    const { occupation, location, bio, goalsObjectives, collaborationInterests, skillsExpertise, skillService1, skillService2, communicationPreferences, preferedCollaborationStyle, website, contactInformation } = req.body;

    // Check if the user already has a profile record
    let existingProfile = await Profile.findOne({ where: { userId: req.session.user.userId } });

    if (existingProfile) {
      // Update the existing profile record
      existingProfile = await existingProfile.update({ occupation, location, bio, goalsObjectives, collaborationInterests, skillsExpertise, skillService1, skillService2, communicationPreferences, preferedCollaborationStyle, website, contactInformation });

      // Create an audit log for the profile update
      await createAuditLog('Profile', existingProfile.profileId, 'UPDATE', {}, existingProfile.dataValues, req.session.user.userId);
    } else {
      // Create a new profile record in the database
      const newProfile = await Profile.create({ userId: req.session.user.userId, occupation, location, bio, goalsObjectives, collaborationInterests, skillsExpertise, skillService1, skillService2, communicationPreferences, preferedCollaborationStyle, website, contactInformation });

      // Create an audit log for the profile creation
      await createAuditLog('Profile', newProfile.profileId, 'CREATE', {}, newProfile.dataValues, req.session.user.userId);
    }

    // Redirect the user to the home page
    res.redirect("/web/profile");

  } catch (error) {
    // Log out the error to the console
    console.error('Error creating/updating profile info:', error);

    // Respond with the error to the client
    return res.status(500).json({ message: 'Internal Server Error' });
  }  
}

const createPost = async (req, res) => {
  try {
    // Extract user data from the request body
    const { description } = req.body;

    
      // Create a new post record in the database
      const newPost = await Post.create({ userId: req.session.user.userId, description });

      // Create an audit log for the post creation
      await createAuditLog('Post', newPost.postId, 'CREATE', {}, newPost.dataValues, req.session.user.userId);

    // Redirect the user to the home page
    res.redirect("/web/home");

  } catch (error) {
    // Log out the error to the console
    console.error('Error creating/updating post info:', error);

    // Respond with the error to the client
    return res.status(500).json({ message: 'Internal Server Error' });
  }  
}



module.exports = { 
  checkAPIStatus, 
  createUser, 
  updateUser,
  fetchUsers,
  fetchAuditLogs,



  createPersonalDetails,
  createPost,
};
