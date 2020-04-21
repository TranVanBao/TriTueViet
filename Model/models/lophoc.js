'use strict';
module.exports = (sequelize, DataTypes) => {
  const lophoc = sequelize.define('lophoc', {
    tenlophoc: DataTypes.STRING,
    id_giangvien: DataTypes.INTEGER,
    id_phonghoc: DataTypes.INTEGER,
    thoigianbatdau: DataTypes.DATE,
    thoiluonghoc: DataTypes.STRING,
    soluonghocvien: DataTypes.INTEGER,
    thoigianhoc: DataTypes.STRING,
    phidichvu: DataTypes.INTEGER,
    dieukienhoc: DataTypes.TEXT,     
    trangthai: DataTypes.INTEGER
  }, {});
  lophoc.associate = function(models) {
    // associations can be defined here
    lophoc.belongsTo(models.phonghoc, {
			foreignKey: 'id',
			as: 'phonghocs',
			onDelete: 'CASCADE',
    });
    lophoc.belongsTo(models.giangvien, {
			foreignKey: 'id',
			as: 'giangviens',
			onDelete: 'CASCADE',
    });
    lophoc.belongsTo(models.khoahoc, {
			foreignKey: 'id',
			as: 'khoahocs',
			onDelete: 'CASCADE',
    });
    lophoc.hasMany(models.dangky, {
			foreignKey: 'id_lophoc',
			as: 'dangkies',
			onDelete: 'CASCADE',
		});

  };
  return lophoc;
};