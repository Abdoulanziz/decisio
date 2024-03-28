'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('profiles', {
      profile_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      profile_uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      occupation: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      goals_objectives: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      collaboration_interests: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      skills_expertise: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      skill_service1: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      skill_service2: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      communication_preferences: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      prefered_collaboration_style: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      website: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contact_information: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('profiles');
  }
};