'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('thoikhoabieus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      thoigianbatdau: {
        type: Sequelize.DATE
      },
      thoigianketthuc: {
        type: Sequelize.DATE
      },
      id_lop: {
        type: Sequelize.INTEGER
      },
      id_phong: {
        type: Sequelize.INTEGER
      },
      id_giangvien: {
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
    return queryInterface.dropTable('thoikhoabieus');
  }
};