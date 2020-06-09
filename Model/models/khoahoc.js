'use strict';
module.exports = (sequelize, DataTypes) => {
  const khoahoc = sequelize.define('khoahoc', {
    tenkhoahoc: DataTypes.STRING,   
    hinhanh: DataTypes.STRING,
    loaikhoahoc: DataTypes.STRING,   
    lotrinhhoc: DataTypes.TEXT,  
    dieukienhoc: DataTypes.TEXT, 
    trangthai: DataTypes.INTEGER
  }, {});
  khoahoc.associate = function(models) {
    // associations can be defined here
    khoahoc.hasMany(models.lophoc, {
			foreignKey: 'id_phonghoc',
			as: 'lophocs',
			onDelete: 'CASCADE',
		});
  };
  return khoahoc;
};