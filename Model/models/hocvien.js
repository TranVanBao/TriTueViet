'use strict';
module.exports = (sequelize, DataTypes) => {
  const hocvien = sequelize.define('hocvien', {
    hoten: DataTypes.STRING,
    sdt: DataTypes.INTEGER,
    diachi: DataTypes.STRING,
    email: DataTypes.STRING,
    gioitinh: DataTypes.STRING,
    trangthai: DataTypes.STRING,
    ngaysinh: DataTypes.STRING
  }, {});
  hocvien.associate = function(models) {
    // associations can be defined here
  };
  return hocvien;
};