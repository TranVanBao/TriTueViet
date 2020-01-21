'use strict';
module.exports = (sequelize, DataTypes) => {
  const dangky = sequelize.define('dangky', {
    tenkhachhang: DataTypes.STRING,
    sdt: DataTypes.INTEGER,
    diachi: DataTypes.STRING,
    email: DataTypes.STRING,
    id_lophoc: DataTypes.INTEGER,    
    thanhtoan: DataTypes.INTEGER,
    trangthai: DataTypes.INTEGER
  }, {});
  dangky.associate = function(models) {
    // associations can be defined here
  };
  return dangky;
};