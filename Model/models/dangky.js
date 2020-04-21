'use strict';
module.exports = (sequelize, DataTypes) => {
  const dangky = sequelize.define('dangky', {
    tenkhachhang: DataTypes.STRING,
    sdt: DataTypes.INTEGER,
    diem: DataTypes.INTEGER,
    diachi: DataTypes.STRING,
    gioitinh: DataTypes.STRING,
    email: DataTypes.STRING,
    id_lophoc: DataTypes.INTEGER,    
    thanhtoan: DataTypes.INTEGER,
    trangthai: DataTypes.INTEGER
  }, {});
  dangky.associate = function(models) {
    // associations can be defined here
    dangky.belongsTo(models.lophoc, {
			foreignKey: 'id',
			as: 'lophocs',
			onDelete: 'CASCADE',
    });
  };
  return dangky;
};