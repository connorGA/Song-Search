'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dislike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  dislike.init({
    title: DataTypes.STRING,
    album: DataTypes.STRING,
    artist: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    lyrics: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'dislike',
  });
  return dislike;
};