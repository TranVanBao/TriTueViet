'use strict';
module.exports = (sequelize, DataTypes) => {
  const phanquyen = sequelize.define('phanquyen', {
    quyenhang: DataTypes.STRING,
    trangthai: DataTypes.INTEGER
  }, {});
  phanquyen.associate = function(models) {
    // associations can be defined here
  };
  return phanquyen;
};