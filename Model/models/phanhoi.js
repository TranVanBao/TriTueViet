'use strict';
module.exports = (sequelize, DataTypes) => {
  const phanhoi = sequelize.define('phanhoi', {   
    noidungtraloi: DataTypes.TEXT,   
    id_tktraloi: DataTypes.INTEGER,
    id_diendan: DataTypes.INTEGER
  }, {});
  phanhoi.associate = function(models) {
    // associations can be defined here
    phanhoi.belongsTo(models.diendan,{
			foreignKey: 'id',
			as: 'diendans',
			onDelete: 'CASCADE',
    });
    phanhoi.belongsTo(models.taikhoan, {
			foreignKey: 'id',
			as: 'taikhoans',
			onDelete: 'CASCADE',
    });
  };
  return phanhoi;
};