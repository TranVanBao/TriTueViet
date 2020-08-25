var database = require("../../Model/models")

class dangkyService {
  static async getAll() {
    try {
      return await database.dangky.sequelize.query(
        `SELECT  lophocs.tenlophoc,lophocs.trangthai as th,lophocs.thoigianhoc, lophocs.phidichvu , dangkies.* 
        FROM public.lophocs,public.dangkies 
        where lophocs.id = dangkies.id_lophoc 
        ORDER BY id DESC  `
      );
    } catch (error) {
      throw error;
    }
  }
  // get thu tien 
  static async thutien() {
    try {
      return await database.dangky.sequelize.query(
        `SELECT  lophocs.tenlophoc,lophocs.trangthai as th,lophocs.thoigianbatdau as bd,lophocs.thoigianhoc, lophocs.phidichvu , dangkies.* 
        FROM public.lophocs,public.dangkies 
        where lophocs.id = dangkies.id_lophoc and lophocs.trangthai =1
        ORDER BY id DESC   `
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
        where: { id  }
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

  // update diem hoc vien
  static async UpdateDiem(email,id, data) {
    try {
      let tk = await database.dangky.findOne({
        where: { email : email }
      }); 
       if (tk) {              
        let kq = await database.dangky.sequelize.query(
         ` UPDATE public.dangkies
          SET  diem=`+data+`
          WHERE email='`+email+`' and id_lophoc =`+id+``
        ); 
       if(kq){
         return 1
       }else return 0
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  static async add(data) {
    try { 
      let tk = await database.dangky.findOne({
        where: { tenkhachhang : data.tenkhachhang, id_lophoc: data.id_lophoc , sdt:data.sdt  }
      });  
       if (tk) {  
        return null              
      }else {  console.log(data);
      let k =    await database.dangky.create(data);
        if(k){
          return 1
        }else return 0
      }
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
        where dangkies.id_lophoc = lophocs.id and (dangkies.thanhtoan >= lophocs.phidichvu/2) 
        ORDER BY id DESC  `
      );
    } catch (error) {
      throw error;
    }
  }

  // sinh vien dang ky trong ngay hom nay
  static async getthongKeNgay(ngay) {
    try {
      return await database.dangky.sequelize.query(
        `select lophocs.tenlophoc,lophocs.thoigianbatdau,lophocs.phidichvu , dangkies.* 
        from public.lophocs, public.dangkies 
        where dangkies.id_lophoc = lophocs.id and  dangkies.ngaydangky = '`+ngay+`'
        ORDER BY id DESC   `
      );
    } catch (error) {
      throw error;
    }
  }

  // Thống kê
  static async thongke(nam,nam1) {
    try {
      return await database.dangky.sequelize.query(
        `SELECT dangkies.id_lophoc , lophocs.tenlophoc, count(id_lophoc) AS dem FROM public.dangkies, public.lophocs
        Where lophocs.id = dangkies.id_lophoc and (lophocs.thoigianbatdau between '`+nam+`' and '`+nam1+`')
        GROUP BY dangkies.id_lophoc, lophocs.tenlophoc ORDER BY dem DESC; `
      );
    } catch (error) {
      throw error;
    }
  }

  static async Tongthongke(nam,nam1) {
    try {
      return await database.dangky.sequelize.query(
        `SELECT  SUM(dem) as tong 
        FROM (SELECT COUNT(id_lophoc) AS dem
        FROM public.dangkies, public.lophocs 
             Where lophocs.id = dangkies.id_lophoc  and (lophocs.thoigianbatdau between '`+nam+`' and '`+nam1+`')
        GROUP BY id_lophoc
        ) as A `
      );
    } catch (error) {
      throw error;
    }
  }

  static async demsosinhvien() {
    try {
      return await database.dangky.sequelize.query(
        `SELECT COUNT(id)  FROM public.dangkies
        WHERE dangkies.thanhtoan > 0 `
      );
    } catch (error) {
      throw error;
    }
  }



  static async TongthongkeThu(nam,nam1) {
    try {
      return await database.dangky.sequelize.query(
        `select sum(thanhtoan) as tong from public.dangkies , public.lophocs
        Where lophocs.id = dangkies.id_lophoc and (lophocs.thoigianbatdau between '`+nam+`' and '`+nam1+`')`
      );
    } catch (error) {
      throw error;
    }
  }
  static async ThongkeThu(nam,nam1) {
    try {
      return await database.dangky.sequelize.query(
        ` SELECT lophocs.tenlophoc , SUM(thanhtoan) AS dem
        FROM public.dangkies, public.lophocs 
             Where lophocs.id = dangkies.id_lophoc  and (lophocs.thoigianbatdau between '`+nam+`' and '`+nam1+`')
        GROUP BY id_lophoc , lophocs.tenlophoc
        `
      );
    } catch (error) {
      throw error;
    }
  }
}

module.exports = dangkyService;
