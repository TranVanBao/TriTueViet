'use strict';
module.exports = (sequelize, DataTypes) => {
  const taikhoan = sequelize.define('taikhoan', {
    email: DataTypes.STRING,
    tentaikhoan: DataTypes.STRING,
    matkhau: DataTypes.STRING,
    quyenhang: DataTypes.STRING,
    trangthai: DataTypes.INTEGER
  }, {});
  taikhoan.associate = function(models) {
    // associations can be defined here
  };
  return taikhoan;
};