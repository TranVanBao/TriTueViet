'use strict';
module.exports = (sequelize, DataTypes) => {
  const phanquyen = sequelize.define('phanquyen', {
    quyenhang: DataTypes.STRING,
    trangthai: DataTypes.INTEGER
  }, {});
  phanquyen.associate = function(models) {
    // associations can be defined here
    phanquyen.hasMany(models.taikhoan, {
			foreignKey: 'quyenhang',
			as: 'taikhoans',
			onDelete: 'CASCADE',
		});

  };
  return phanquyen;
};