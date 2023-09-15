'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ingredient.belongsTo(models.Item, { foreignKey: "itemId" });

      // define association here
    }
  }
  Ingredient.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: { msg: 'Name is required' },
        notNull: { msg: 'Name is required' },

      }
    },
    itemId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ingredient',
  });
  return Ingredient;
};