import database from "../../Model/models";

class phanhoiService {
  static async getAll() {
    try {
      return await database.phanhoi.findAll();
    } catch (error) {
      throw error;
    }
  }
  static async getByID(id) {
    try {
      return await database.phanhoi.findAll({
        where: { id }
      });
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      return await database.phanhoi.destroy({
        where: { id }
      });
    } catch (error) {
      throw error;
    }
  }
  static async Save(data) {
    try {
      return await database.phanhoi.create(data);
    } catch (error) {
      throw error;
    }
  }

  static async Update(id, data) {
    try {
      let tk = await database.phanhoi.findOne({
        where: { id }
      });
      if (tk) {
        return await database.phanhoi.update(data, {
          where: { id: Number(id) }
        });
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default phanhoiService;
