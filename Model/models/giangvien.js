'use strict';
module.exports = (sequelize, DataTypes) => {
  const giangvien = sequelize.define('giangvien', {
    hoten: DataTypes.STRING,
    sdt: DataTypes.INTEGER,
    diachi: DataTypes.STRING,
    email: DataTypes.STRING,
    gioitinh: DataTypes.STRING,
    linhvuc: DataTypes.TEXT,
    hinhanh: DataTypes.STRING,
    trangthai: DataTypes.INTEGER,
    id_tk: DataTypes.INTEGER
  }, {});
  giangvien.associate = function(models) {
    // associations can be defined here
  };
  return giangvien;
};