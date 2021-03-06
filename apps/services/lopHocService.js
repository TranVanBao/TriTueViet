var database = require("../../Model/models")

class lophocService {
  static async getAll(trangthai) {
    try {
      let lophoc = await database.khoahoc.sequelize.query(
        `Select giangviens.hoten , lophocs.* , phonghocs.tenphonghoc ,phonghocs.id as id_phong
        from public.lophocs,public.phonghocs, public.giangviens
        where giangviens.id = lophocs.id_giangvien and lophocs.trangthai=` +
          trangthai +
          ` and phonghocs.id = lophocs.id_phonghoc
        ORDER BY id DESC`
      );
      return lophoc;
    } catch (error) {
      throw error;
    }
  }
  //  lay theo giang vien out site
  static async getGVOut(trangthai,id_tk) {
    try {
      let lophoc = await database.khoahoc.sequelize.query(
        `Select giangviens.hoten , lophocs.* , phonghocs.tenphonghoc ,phonghocs.id as id_phong
        from public.lophocs,public.phonghocs, public.giangviens , public.taikhoans
        where giangviens.id = lophocs.id_giangvien and phonghocs.id = lophocs.id_phonghoc and taikhoans.id = giangviens.id_tk
		 and lophocs.trangthai=` +
     trangthai +
     ` and giangviens.id_tk = ` +
     id_tk +
     `
        ORDER BY id DESC`
      );
      return lophoc;
    } catch (error) {
      throw error;
    }
  }
  //  === end lay theo giang vien
  static async getsapmo() {
    try {
      return await database.lophoc.findAll({
        where: { trangthai: 1 }
      });
    } catch (error) {
      throw error;
    }
  }
  // === sd thoi khoa bieu ====
  static async getdanghoc() {
    try {
      let lophoc = await database.khoahoc.sequelize.query(
        `Select giangviens.hoten , lophocs.* ,phonghocs.tenphonghoc
        from public.lophocs, public.giangviens , public.phonghocs
        where giangviens.id = lophocs.id_giangvien and lophocs.trangthai=2 and phonghocs.id = lophocs.id_phonghoc
         ORDER BY id DESC`
      );
      return lophoc;
    } catch (error) {
      throw error;
    }
  }
  static async get1lop(trangthai) {
    try {
      let lophoc = await database.khoahoc.sequelize.query(
        `Select giangviens.hoten , lophocs.* ,phonghocs.tenphonghoc
        from public.lophocs, public.giangviens , public.phonghocs
        where giangviens.id = lophocs.id_giangvien and phonghocs.id = lophocs.id_phonghoc and lophocs.trangthai=` +
          trangthai +
          ` ORDER BY id DESC`
      );
      return lophoc;
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
      return await database.lophoc.create(data);
    } catch (error) {
      throw error;
    }
  }

  static async Update(id, data) {
    try {  
      let trangthai = data.trangthai
      let thoigianbatdau = data.thoigianbatdau   
      let tenlophoc  = data.tenlophoc 
      let tk = await database.lophoc.findOne({
        where: { id  , trangthai ,thoigianbatdau , tenlophoc}
      }); 
      if (tk == null) { 
        await database.lophoc.update(data, {
          where: { id}
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
      let thoigianbatdau = data.thoigianbatdau   
      let tenlophoc  = data.tenlophoc 
      let trangthai  = data.trangthai 
      let tk = await database.lophoc.findOne({
        where: { thoigianbatdau , tenlophoc, trangthai }
      });
        
      if (tk !== null) {
         return 0;
      }else{
        let up = await database.lophoc.create(data);
        if(up){
          return 2
        }else return 1
       
      }     
    } catch (error) {
      throw error;
    }
  }

  // ====================out site=========
  static async getAllOusite() {
    try {
      let id_khoahoc = await database.khoahoc.sequelize.query(
        `SELECT  khoahocs.hinhanh ,lophocs.*
        FROM public.khoahocs,public.lophocs 
        where lophocs.tenlophoc = khoahocs.tenkhoahoc  and lophocs.trangthai =1 
        ORDER BY id DESC`
      );
      return id_khoahoc;
    } catch (error) {
      throw error;
    }
  }

  //  === noi dung khoa hoc /course/noidung
  static async getAllOusiteND() {
    try {
      let id_khoahoc = await database.khoahoc.sequelize.query(
        `SELECT  khoahocs.* 
        FROM public.khoahocs,public.lophocs 
        where lophocs.tenlophoc = khoahocs.tenkhoahoc  and lophocs.trangthai =1 
        ORDER BY id DESC`
      );
      return id_khoahoc;
    } catch (error) {
      throw error;
    }
  }

  // đếm tổng số lớp học
  static async countLop(nam,nam1) {
    try {console.log(nam);
      let dem = await database.lophoc.sequelize.query(
        `SELECT COUNT(id)  FROM public.lophocs
        WHERE lophocs.trangthai !=3  and (lophocs.thoigianbatdau between '`+nam+`' and '`+nam1+`')` 
      );
      return dem;
    } catch (error) {
      throw error;
    }
  }
  // đếm tổng của từng lớp
  static async countTungLop(nam,nam1) {
    try {
      return await  database.lophoc.sequelize.query(
        `SELECT lophocs.tenlophoc , COUNT(id) AS dem
        FROM  public.lophocs 
             WHERE lophocs.trangthai !=3  and (lophocs.thoigianbatdau between '`+nam+`' and '`+nam1+`')
        GROUP BY  lophocs.tenlophoc`
      );
     
    } catch (error) {
      throw error;
    }
  }
  // =================trang ca nhan giang vien==========
  // static async getAllGV(trangthai ,id_giangvien) {
  //   try {
  //      let lophoc = await database.khoahoc.sequelize.query(
  //       `Select giangviens.hoten , lophocs.*
  //       from public.lophocs, public.giangviens
  //       where giangviens.id = lophocs.id_giangvien and lophocs.trangthai=`+trangthai+` and lophocs.id_giangvien = `+id_giangvien+`
  //       ORDER BY id DESC`
  //     );
  //     return lophoc;

  //   } catch (error) {
  //     throw error;
  //   }
  // }
}

module.exports = lophocService;
