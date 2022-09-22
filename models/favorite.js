'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.favorite.belongsTo(models.user)
    }
  }
  favorite.init({
    title: DataTypes.STRING,
    album: DataTypes.STRING,
    artist: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    lyrics: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'favorite',
  });
  return favorite;
};