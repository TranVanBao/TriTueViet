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
      let id_khoahoc = await database.khoahoc.sequelize.query(
        `SELECT phanhois.*, taikhoans.tentaikhoan, diendans.id , taikhoans.hinhanh
         FROM public.phanhois,public.diendans, public.taikhoans  
         where phanhois.id_tktraloi = taikhoans.id and phanhois.id_diendan = diendans.id and phanhois.id_diendan = ` + id + ` `
      );      
      return id_khoahoc;
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
  static async add(data) {
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
        await database.phanhoi.update(data, {
          where: { id }
        });
        return data;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

 
}

export default phanhoiService;
