'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item.belongsTo(models.Category, { foreignKey: "categoryId" });
      Item.hasMany(models.Ingredient, { foreignKey: "itemId" });
      // define association here
    }
  }
  Item.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: { msg: 'Name is required' },
        notNull: { msg: 'Name is required' },

      }
    },
    imageUrl: DataTypes.STRING,
    
    categoryId: DataTypes.INTEGER,
    mongoUserId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};