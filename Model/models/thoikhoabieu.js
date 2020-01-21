'use strict';
module.exports = (sequelize, DataTypes) => {
  const thoikhoabieu = sequelize.define('thoikhoabieu', {
    thoigianbatdau: DataTypes.DATE,
    thoigianketthuc: DataTypes.DATE,
    id_lop: DataTypes.INTEGER,
    id_phong: DataTypes.INTEGER,
    id_giangvien: DataTypes.INTEGER,
    trangthai: DataTypes.INTEGER
  }, {});
  thoikhoabieu.associate = function(models) {
    // associations can be defined here
  };
  return thoikhoabieu;
};