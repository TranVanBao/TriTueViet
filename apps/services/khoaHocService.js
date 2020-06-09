var database = require("../../Model/models")
var sequelize = require("sequelize")
class khoahocService {
  static async getAll() {
    try {
      return await database.khoahoc.findAll({        
        order: [         
          ['id', 'DESC']
        ]
      }
      );
    } catch (error) {
      throw error;
    }
  }
  static async getByID(id) {
    try {
      let id_khoahoc = await database.khoahoc.sequelize.query(
        `SELECT  tenkhoahoc , dieukienhoc,lotrinhhoc FROM public.khoahocs  where tenkhoahoc = '` + id + `' `
      );
      return id_khoahoc;
    } catch (error) {
      throw error;
    }
  }
  static async getByUpdate(id) {
    try {
      let id_khoahoc = await database.khoahoc.sequelize.query(
        `SELECT  * FROM public.khoahocs  where id = ` + id + ` `
      );
      return id_khoahoc;
    } catch (error) {
      throw error;
    }
  }
// get moi nhta ko co id 
static async getByIDMN() {
  try {
    let id_khoahoc = await database.khoahoc.sequelize.query(
      `SELECT *
      FROM khoahocs
      WHERE id = (SELECT MAX(id) FROM khoahocs) `
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
  //  sử dụng cho lớp học
  static async getKH() {
    try {
      return await database.khoahoc.findAll({  
             where:{trangthai:1}, 
        order: [         
          ['id', 'DESC']
        ]
      }
      );
    } catch (error) {
      throw error;
    }
  }

}

module.exports = khoahocService;
