'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('giangviens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hoten: {
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
      gioitinh: {
        type: Sequelize.STRING
      },
      linhvuc: {
        type: Sequelize.TEXT
      },
      trangthai: {
        type: Sequelize.INTEGER
      },
      id_tk: {
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
    return queryInterface.dropTable('giangviens');
  }
};