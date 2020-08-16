var database =require("../../Model/models");

class baivietService {
  static async getAll() {
    try {
      return await database.baiviet.sequelize.query(        
        `SELECT  baiviets.*,chuyenmucs.tenchuyenmuc FROM public.baiviets, public.chuyenmucs  where chuyenmucs.id = baiviets.id_chuyenmuc ORDER BY baiviets.id  DESC;`
      );
    } catch (error) {
      throw error;
    }
  }
  static async getOutsite(limit) {
    try {
      return await database.baiviet.findAll({
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
      return await database.baiviet.findAll({
        where: { trangthai: 1 , id_chuyenmuc:chuyenmuc },
        order: [["id", "DESC"]],
        offset : 1,
        limit: limit
      });
    } catch (error) {
      throw error;
    }
  }
  static async getACM(chuyenmuc) {
    try {
      let tk = await database.baiviet.sequelize.query(
        `SELECT  * FROM public.baiviets  where id = (SELECT MAX(id) FROM baiviets WHERE trangthai =1 and id_chuyenmuc = '`+chuyenmuc+`')  `
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
      let tk = await database.baiviet.sequelize.query(        
        `SELECT  baiviets.*,chuyenmucs.tenchuyenmuc FROM public.baiviets, public.chuyenmucs  where baiviets.id = ` + id + ` and chuyenmucs.id = baiviets.id_chuyenmuc`
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
      return await database.baiviet.sequelize.query(
        `SELECT *
        FROM baiviets
        WHERE id = (SELECT MAX(id) FROM baiviets WHERE trangthai =1 ) `
      );
    } catch (error) {
      throw error;
    }
  }
  static async getNeWBV() {
    try {
      return await database.baiviet.findAll({
        where: { trangthai: 1 },
        order: [["id", "DESC"]],
        offset : 1,
        limit: 3
      });
    } catch (error) {
      throw error;
    }
  }
  static async delete(id) {
    try {
      return await database.baiviet.destroy({
        where: { id }
      });
    } catch (error) {
      throw error;
    }
  }
  static async Save(data) {
    try {     
      let tk = await database.baiviet.create(data);
      if(tk){
        return tk
      }else{
        return 0
      }
    } catch (error) {
      throw error;
    }
  }

  static async Update(id, data) {
    try { 
      let tk = await database.baiviet.findOne({
        where: { id }
      }); 
      if (tk) {       
        let th = await database.baiviet.update(data, {
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

module.exports = baivietService;
