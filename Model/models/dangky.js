'use strict';
module.exports = (sequelize, DataTypes) => {
  const dangky = sequelize.define('dangky', {
    tenkhachhang: DataTypes.STRING,
    sdt: DataTypes.NUMERIC,
    diem: DataTypes.INTEGER,
    diachi: DataTypes.STRING,
    gioitinh: DataTypes.STRING,
    email: DataTypes.STRING,
    id_lophoc: DataTypes.INTEGER,    
    thanhtoan: DataTypes.INTEGER,
    ngaydangky: DataTypes.DATE,
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