import database from "../../Model/models";

class lophocService {
  static async getAll() {
    try {
      return await database.lophoc.findAll();
    } catch (error) {
      throw error;
    }
  }
  static async getByID(id) {
    try {
      return await database.lophoc.findAll({
        where: { id }
      });
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      return await database.lophoc.destroy({
        where: { id }
      });
    } catch (error) {
      throw error;
    }
  }
  static async Save(data) {
    try {
      console.log(1);
      return await database.lophoc.create(data);
    } catch (error) {
      throw error;
    }
  }

  static async Update(id, data) {
    try {
      let tk = await database.lophoc.findOne({
        where: { id }
      });
      if (tk) {
        return await database.lophoc.update(data, {
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
      return await database.lophoc.create(data);
    } catch (error) {
      throw error;
    }
  }

  
}

export default lophocService;
