var database = require("../../Model/models");

class chuyenmucService {
  static async getAll() {
    try {
      return await database.chuyenmuc.findAll({        
        order: [["id", "DESC"]]
      });
    } catch (error) {
      throw error;
    }
  }
  static async getOutsite(limit) {
    try {
      return await database.chuyenmuc.findAll({
        where: { trangthai: 1 },
        order: [["id", "DESC"]],
        limit: limit
      });
    } catch (error) {
      throw error;
    }
  }
  // Outsite
  static async getNeWCM(limit,chuyenmuc) {
    try {
      return await database.chuyenmuc.findAll({
        where: { trangthai: 1 , chuyenmuc },
        order: [["id", "DESC"]],
        limit: limit
      });
    } catch (error) {
      throw error;
    }
  }
  static async getACM(chuyenmuc) {
    try {
      let tk = await database.khoahoc.sequelize.query(
        `SELECT  * FROM public.chuyenmucs  where id = (SELECT MAX(id) FROM chuyenmucs WHERE trangthai =1 and chuyenmuc = '`+chuyenmuc+`')  `
      );
      if (tk) {
        return tk;
      } else {
        return 0;
      }
    } catch (error) {
      throw error;
    }
  }

  static async getA(id) {
    try {
      let tk = await database.khoahoc.sequelize.query(
        `SELECT  * FROM public.chuyenmucs  where id = ` + id + ` `
      );
      if (tk) {
        return tk;
      } else {
        return 0;
      }
    } catch (error) {
      throw error;
    }
  }
  static async getNew() {
    try {
      return await database.chuyenmuc.sequelize.query(
        `SELECT *
        FROM chuyenmucs
        WHERE id = (SELECT MAX(id) FROM chuyenmucs WHERE trangthai =1 ) `
      );
    } catch (error) {
      throw error;
    }
  }
  static async delete(id) {
    try {
      return await database.chuyenmuc.destroy({
        where: { id }
      });
    } catch (error) {
      throw error;
    }
  }
  static async Save(data) {
    try {
      return await database.chuyenmuc.create(data);
    } catch (error) {
      throw error;
    }
  }

  static async Update(id, data) {
    try {
      let tk = await database.chuyenmuc.findOne({
        where: { id }
      });
      if (tk) {
        let th = await database.chuyenmuc.update(data, {
          where: { id }
        });
        return th;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports =  chuyenmucService;
