// In your model file
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, { foreignKey: 'userId' });
      Post.hasMany(models.AuditLog, { foreignKey: 'postId' });
    }
  }

  Post.init(
    {
      postId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        field: 'post_id',
      },
      postUuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        field: 'post_uuid',
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'description',
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
      modelName: 'Post',
      tableName: 'posts',
    }
  );

  return Post;
};
