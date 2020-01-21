'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('lophocs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tenlophoc: {
        type: Sequelize.STRING
      },
      thoigianbatdau: {
        type: Sequelize.DATE
      },
      thoigianketthuc: {
        type: Sequelize.DATE
      },
      soluonghocvien: {
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
    return queryInterface.dropTable('lophocs');
  }
};