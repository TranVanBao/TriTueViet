'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('khoahocs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tenkhoahoc: {
        type: Sequelize.STRING
      },
      dieukienhoc: {
        type: Sequelize.TEXT
      },
      hinhanh: {
        type: Sequelize.STRING
      },
      loaikhoahoc: {
        type: Sequelize.STRING
      },
      phidichvu: {
        type: Sequelize.INTEGER
      },
      soluongmua: {
        type: Sequelize.INTEGER
      },
      trangthai: {
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
    return queryInterface.dropTable('khoahocs');
  }
};