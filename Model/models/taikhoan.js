'use strict';
module.exports = (sequelize, DataTypes) => {
  const taikhoan = sequelize.define('taikhoan', {
    email: DataTypes.STRING,
    tentaikhoan: DataTypes.STRING,
    matkhau: DataTypes.STRING,
    hinhanh: DataTypes.STRING,
    quyenhang: DataTypes.STRING,
    token: DataTypes.STRING,
    kichhoat: DataTypes.BOOLEAN                     ,
    trangthai: DataTypes.INTEGER
  }, {});
  taikhoan.associate = function(models) {
    // associations can be defined here
    taikhoan.hasMany(models.phanhoi, {
			foreignKey: 'id_traloi',
			as: 'phanhois',
			onDelete: 'CASCADE',
    });
    taikhoan.hasMany(models.diendan, {
			foreignKey: 'id_taikhoan',
			as: 'diendans',
			onDelete: 'CASCADE',
    });
    taikhoan.belongsTo(models.phanquyen,{
			foreignKey: 'quyenhang',
			as: 'phanquyens',
			onDelete: 'CASCADE',
    });
  };
  return taikhoan;
};