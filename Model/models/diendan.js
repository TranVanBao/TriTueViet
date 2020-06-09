'use strict';
module.exports = (sequelize, DataTypes) => {
  const diendan = sequelize.define('diendan', {
    tieude: DataTypes.TEXT,
    id_khoahoc: DataTypes.INTEGER,
    id_taikhoan: DataTypes.INTEGER,
    noidung: DataTypes.TEXT,
    trangthai: DataTypes.INTEGER
  }, {});
  diendan.associate = function(models) {
    // associations can be defined here
    diendan.belongsTo(models.taikhoan, {
			foreignKey: 'id',
			as: 'taikhoans',
			onDelete: 'CASCADE',
    });
    diendan.hasMany(models.phanhoi, {
			foreignKey: 'id_diendan',
			as: 'phanhois',
			onDelete: 'CASCADE',
    });
    diendan.hasOne(models.khoahoc, {
			foreignKey: 'id',
			as: 'khoahocs',
			onDelete: 'CASCADE',
		});

    
  };
  return diendan;
};