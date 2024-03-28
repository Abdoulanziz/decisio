'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('users', 'role_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'roles',
          key: 'role_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),

      queryInterface.changeColumn('profiles', 'user_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),

      queryInterface.changeColumn('posts', 'user_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),

      queryInterface.changeColumn('audit_logs', 'user_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('users', 'role_id'),
      queryInterface.removeColumn('profiles', 'user_id'),
      queryInterface.removeColumn('posts', 'user_id'),
      queryInterface.removeColumn('audit_logs', 'user_id'),
    ]);
  },
};
