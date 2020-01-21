'use strict';
module.exports = (sequelize, DataTypes) => {
  const phanhoi = sequelize.define('phanhoi', {
    tieude: DataTypes.TEXT,
    noidung: DataTypes.TEXT,
    noidungtraloi: DataTypes.TEXT,
    id_tkhoi: DataTypes.INTEGER,
    id_tktraloi: DataTypes.INTEGER,
    id_diendan: DataTypes.INTEGER
  }, {});
  phanhoi.associate = function(models) {
    // associations can be defined here
  };
  return phanhoi;
};