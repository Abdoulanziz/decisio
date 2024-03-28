// In your model file
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, { foreignKey: 'roleId' });
      User.hasMany(models.AuditLog, { foreignKey: 'userId' });
    }
  }

  User.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        field: 'user_id',
      },
      userUuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        field: 'user_uuid',
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'full_name',
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'email',
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password',
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'role_id',
      },
      profileCompletionStatus: {
        type: DataTypes.ENUM('complete', 'incomplete'),
        defaultValue: 'incomplete',
        allowNull: false,
        field: 'profile_completion_status',
      },
      accountStatus: {
        type: DataTypes.ENUM('active', 'suspended'),
        defaultValue: 'suspended',
        allowNull: false,
        field: 'account_status',
      },
      lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'last_login',
      },
      passwordResetToken: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'password_reset_token',
      },
      passwordResetTokenExpiry: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'password_reset_token_expiry',
      },
      emailVerificationToken: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'email_verification_token',
      },
      emailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        field: 'email_verified',
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
    }
  );

  return User;
};
