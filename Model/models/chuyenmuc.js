'use strict';
module.exports = (sequelize, DataTypes) => {
  const chuyenmuc = sequelize.define('chuyenmuc', {
    tenchuyenmuc: DataTypes.STRING,
    trangthai: DataTypes.INTEGER
  }, {});
  chuyenmuc.associate = function(models) {
    // associations can be defined here
  };
  return chuyenmuc;
};