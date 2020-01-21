import database from "../../Model/models";
import sequelize from "sequelize";
class khoahocService {
  static async getAll() {
    try {
      return await database.khoahoc.findAll();
    } catch (error) {
      throw error;
    }
  }
  static async getByID(id) {
    try {
      let id_khoahoc = await database.khoahoc.sequelize.query(
        `SELECT  tenkhoahoc FROM public.khoahocs  where id = ` + id + ` `
      );
      return id_khoahoc;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      return await database.khoahoc.destroy({
        where: { id }
      });
    } catch (error) {
      throw error;
    }
  }
  static async Save(data) {
    try {
      return await database.khoahoc.create(data);
    } catch (error) {
      throw error;
    }
  }

  static async Update(id, data) {
    try {
      let tk = await database.khoahoc.findOne({
        where: { id }
      });
      if (tk) {
        await database.khoahoc.update(data, {
          where: { id: id }
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
      let tenkhoahoc = data.tenkhoahoc;
      let tk = await database.khoahoc.findOne({
        where: { tenkhoahoc }
      });
      if (tk) {
        return null;
      }
      return await database.khoahoc.create(data);
    } catch (error) {
      throw error;
    }
  }
}

export default khoahocService;
