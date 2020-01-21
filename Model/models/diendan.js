'use strict';
module.exports = (sequelize, DataTypes) => {
  const diendan = sequelize.define('diendan', {
    tieude: DataTypes.STRING,
    id_khoahoc: DataTypes.INTEGER,
    noidung: DataTypes.STRING,
    id_taikhoan: DataTypes.INTEGER,
    trangthai: DataTypes.INTEGER
  }, {});
  diendan.associate = function(models) {
    // associations can be defined here
  };
  return diendan;
};