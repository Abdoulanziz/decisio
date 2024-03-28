// Define the Profile model
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    profileId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        field: 'profile_id',
    },
    profileUuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        field: 'profile_uuid',
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        field: 'user_id',
    },
    occupation: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'occupation',
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'location',
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'bio',
    },
    goalsObjectives: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'goals_objectives',
    },
    collaborationInterests: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'collaboration_interests',
    },
    skillsExpertise: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'skills_expertise',
    },
    skillService1: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'skill_service1',
    },
    skillService2: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'skill_service2',
    },
    communicationPreferences: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'communication_preferences',
    },
    preferedCollaborationStyle: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'prefered_collaboration_style',
    },
    website: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'website',
    },
    contactInformation: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'contact_information',
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
    },
  }, {
    sequelize,
    modelName: 'Profile',
    tableName: 'profiles',
  });

  return Profile;
};
