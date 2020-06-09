var database = require("../../Model/models")

class diendanService {
  static async getAll(limit) {
    try {
      let id_khoahoc = await database.khoahoc.sequelize.query(
        `select khoahocs.tenkhoahoc , diendans.* , taikhoans.hinhanh
        from public.khoahocs, public.diendans , public.taikhoans
        where diendans.id_khoahoc = khoahocs.id and diendans.trangthai =1 and diendans.id_taikhoan = taikhoans.id 
        and diendans.trangthai = 1
        ORDER BY id desc  limit ` +
          limit +
          `
         `
      );
      return id_khoahoc;
    } catch (error) {
      throw error;
    }
  }
  static async getAllAd() {
    try {
      let id_khoahoc = await database.khoahoc.sequelize.query(
        `select khoahocs.tenkhoahoc , diendans.* , taikhoans.tentaikhoan
        from public.khoahocs, public.diendans , public.taikhoans
        where diendans.id_khoahoc = khoahocs.id and diendans.trangthai =1 and diendans.id_taikhoan = taikhoans.id
        ORDER BY id desc      `
      );
      return id_khoahoc;
    } catch (error) {
      throw error;
    }
  }
  static async gettheokhoahoc(id_khoahoc) {
    try {     
      return await database.diendan.findAll({
        where: { id_khoahoc , trangthai : 1 },
        limit: 10
      });
    } catch (error) {
      throw error;
    }
  }
  static async getByID(id) {
    try {
      let id_khoahoc = await database.khoahoc.sequelize.query(
        `SELECT  khoahocs.tenkhoahoc,diendans.*  , taikhoans.hinhanh
        FROM public.khoahocs, public.diendans  , public.taikhoans
        where diendans.id_khoahoc = khoahocs.id  and taikhoans.id = diendans.id_taikhoan  and diendans.id =` +  id +   ` `
      );
      return id_khoahoc;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      return await database.diendan.destroy({
        where: { id }
      });
    } catch (error) {
      throw error;
    }
  }
  static async Save(data) {
    try {
      return await database.diendan.create(data);
    } catch (error) {
      throw error;
    }
  }

  static async Update(id, data) {
    try {
      let tk = await database.diendan.findOne({
        where: { id }
      });
      if (tk) {
        return await database.diendan.update(data, {
          where: { id: Number(id) }
        });
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  // ===================== out site ======================
  static async gettheotk(id) {
    try {
      let id_khoahoc = await database.khoahoc.sequelize.query(
        `SELECT  khoahocs.tenkhoahoc,diendans.* FROM public.khoahocs, public.diendans  where diendans.id_khoahoc = khoahocs.id and diendans.id_taikhoan = ` +
          id +
          ` ORDER BY id DESC `
      );
      return id_khoahoc;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = diendanService;
