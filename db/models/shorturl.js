const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class shorturl extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, {
        foreignKey: 'userId'
      });
    }
  }
  shorturl.init({
    userId: DataTypes.INTEGER,
    longUrl: DataTypes.STRING,
    shortUrl: DataTypes.STRING,
    countClick: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'shorturl',
  });
  return shorturl;
};
