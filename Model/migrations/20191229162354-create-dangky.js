'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('dangkies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tenkhachhang: {
        type: Sequelize.STRING
      },
      sdt: {
        type: Sequelize.INTEGER
      },
      diachi: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      id_khoahoc: {
        type: Sequelize.INTEGER
      },
      thoigiandangky: {
        type: Sequelize.DATE
      },
      thanhtoan: {
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
    return queryInterface.dropTable('dangkies');
  }
};