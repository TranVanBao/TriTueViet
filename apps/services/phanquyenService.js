var database = require("../../Model/models")

class phanquyenService {
  static async getAll() {
    try {
      return await database.phanquyen.findAll();
    } catch (error) {
      throw error;
    }
  }
  static async getByID(id) {
    try {
      return await database.phanquyen.findAll({
        where: { id }
      });
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      return await database.phanquyen.destroy({
        where: { id }
      });
    } catch (error) {
      throw error;
    }
  }
  static async Save(data) {
    try {
      return await database.phanquyen.create(data);
    } catch (error) {
      throw error;
    }
  }

  static async Update(id, data) {
    try {
      let tk = await database.phanquyen.findOne({
        where: { id }
      });
      if (tk) {
        await database.phanquyen.update(data, {
          where: { id }
        });
        return data;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async add(data) {
    try {
      let quyenhang = data.quyenhang;
      let tk = await database.phanquyen.findOne({
        where: { quyenhang }
      });
      if (tk) {
        return null;
      } else {
        await database.phanquyen.create(data);
        return data;
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = phanquyenService;
