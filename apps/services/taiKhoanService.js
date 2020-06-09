var database = require("../../Model/models")

class TaiKhoanService {
  static async getAllTaiKhoan(quyenhang) {
    try {
      return await database.taikhoan.findAll({
        where: { quyenhang }
      });
    } catch (error) {
      throw error;
    }
  }
  static async getAllquyen(quyenhang) {
    try {
      return await database.phanquyen.findAll({
        where: { quyenhang }
      });
    } catch (error) {
      throw error;
    }
  }
  static async getByID(id) {
    try {
      return await database.taikhoan.findAll({
        where: { id }
      });
    } catch (error) {
      throw error;
    }
  }

  static async deleteTK(id) {
    try {
      return await database.taikhoan.destroy({
        where: { id }
      });
    } catch (error) {
      throw error;
    }
  }
  static async SaveTK(data) {
    try {
      return await database.taikhoan.create(data);
    } catch (error) {
      throw error;
    }
  }

  static async UpdateTK(id, data) {
    try {
      let tk = await database.taikhoan.findOne({
        where: { id }
      });
      if (tk) {
        return await database.taikhoan.update(data, {
          where: { id: Number(id) }
        });
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async add(data) {
    try {
      let email = data.email;
      let tk = await database.taikhoan.findOne({
        where: { email }
      });
      if (tk) {
        return null;
      } else return await database.taikhoan.create(data);
    } catch (error) {
      throw error;
    }
  }
  static async getBylogin(email) {
    try {
      return await database.taikhoan.findAll({
        where: { email }
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TaiKhoanService;
