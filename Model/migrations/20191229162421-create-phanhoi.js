'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('phanhois', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tieude: {
        type: Sequelize.TEXT
      },
      noidung: {
        type: Sequelize.TEXT
      },
      noidungtraloi: {
        type: Sequelize.TEXT
      },
      id_tkhoi: {
        type: Sequelize.INTEGER
      },
      id_tktraloi: {
        type: Sequelize.INTEGER
      },
      id_diendan: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('phanhois');
  }
};