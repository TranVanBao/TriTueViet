import database from "../../Model/models";

class dangkyService {
  static async getAll() {
    try {
      return await database.dangky.sequelize.query(
        `SELECT  lophocs.tenlophoc,lophocs.thoigianhoc, lophocs.phidichvu , dangkies.* 
        FROM public.lophocs,public.dangkies 
        where lophocs.id = dangkies.id_lophoc 
        ORDER BY id DESC  `
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
      return await database.dangky.create(data);
    } catch (error) {
      throw error;
    }
  }
  // Sử dụng học viên 
  static async getAllHV() {
    try {
      return await database.dangky.sequelize.query(
        `select lophocs.tenlophoc,lophocs.thoigianbatdau,lophocs.phidichvu , dangkies.* 
        from public.lophocs, public.dangkies 
        where dangkies.id_lophoc = lophocs.id and (dangkies.thanhtoan > lophocs.phidichvu/2) 
        ORDER BY id DESC  `
      );
    } catch (error) {
      throw error;
    }
  }

  // Thống kê
  static async thongke() {
    try {
      return await database.dangky.sequelize.query(
        `SELECT dangkies.id_lophoc , lophocs.tenlophoc , count(id_lophoc) AS dem FROM public.dangkies, public.lophocs
        Where lophocs.id = dangkies.id_lophoc
        GROUP BY dangkies.id_lophoc, lophocs.tenlophoc ORDER BY dem DESC; `
      );
    } catch (error) {
      throw error;
    }
  }

  static async Tongthongke() {
    try {
      return await database.dangky.sequelize.query(
        `SELECT  SUM(dem) as tong 
        FROM (SELECT COUNT(id_lophoc) AS dem
        FROM public.dangkies, public.lophocs 
             Where lophocs.id = dangkies.id_lophoc
        GROUP BY id_lophoc
        ) as A `
      );
    } catch (error) {
      throw error;
    }
  }
  static async TongthongkeThu() {
    try {
      return await database.dangky.sequelize.query(
        `select sum(thanhtoan) as tong from dangkies`
      );
    } catch (error) {
      throw error;
    }
  }
  static async ThongkeThu() {
    try {
      return await database.dangky.sequelize.query(
        ` SELECT lophocs.tenlophoc , SUM(thanhtoan) AS dem
        FROM public.dangkies, public.lophocs 
             Where lophocs.id = dangkies.id_lophoc
        GROUP BY id_lophoc , lophocs.tenlophoc
        `
      );
    } catch (error) {
      throw error;
    }
  }
}

export default dangkyService;
