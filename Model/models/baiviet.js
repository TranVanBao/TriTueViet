'use strict';
module.exports = (sequelize, DataTypes) => {
  const baiviet = sequelize.define('baiviet', {
    tieude: DataTypes.TEXT,
    noidung: DataTypes.TEXT,
    hinhanh: DataTypes.STRING,
    id_taikhoan: DataTypes.INTEGER,
    id_chuyenmuc: DataTypes.INTEGER,
    trangthai: DataTypes.INTEGER
  }, {});
  baiviet.associate = function(models) {
    // associations can be defined here
  };
  return baiviet;
};