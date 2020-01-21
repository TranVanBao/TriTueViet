import database from "../../Model/models";

class dangkyService {
  static async getAll() {
    try {
      return await database.dangky.sequelize.query(
        `SELECT  lophocs.tenlophoc, dangkies.* FROM public.lophocs,public.dangkies where lophocs.id = dangkies.id_lophoc  `
      );
    } catch (error) {
      throw error;
    }
  }
  static async getByID(id) {
    try {
      return await database.dangky.findAll({
        where: { id }
      });
    } catch (error) {
      throw error;
    }
  }
  static async getByIDLop(id) {
    try {
      return await database.dangky.findAll({
        where: { id_lophoc: id }
      });
    } catch (error) {
      throw error;
    }
  }


  static async delete(id) {
    try {
      return await database.dangky.destroy({
        where: { id }
      });
    } catch (error) {
      throw error;
    }
  }
  static async Save(data) {
    try {
      return await database.dangky.create(data);
    } catch (error) {
      throw error;
    }
  }

  static async Update(id, data) {
    try {
      let tk = await database.dangky.findOne({
        where: { id }
      });

      if (tk) {
        return await database.dangky.update(data, {
          where: { id: id }
        });
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  static async add(data) {
    try {
      console.log("========service ");      
      return await database.dangky.create(data);
    } catch (error) {
      throw error;
    }
  }
}

export default dangkyService;
