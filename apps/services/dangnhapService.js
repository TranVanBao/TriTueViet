import database from "../../Model/models";

class dangnhapService {
  static async getAllTaiKhoan(quyenhang) {
    try {
      return await database.taikhoan.findAll({
        where: { quyenhang }
      });
    } catch (error) {
      throw error;
    }
  }
  static async getAllquyen(quyenhang) {
    try {
      return await database.phanquyen.findAll({
        where: { quyenhang }
      });
    } catch (error) {
      throw error;
    }
  }
  static async getByID(id) {
    try {
      return await database.taikhoan.findAll({
        where: { id }
      });
    } catch (error) {
      throw error;
    }
  }

  static async UpdateTK(id, data) {
    try {
      let tk = await database.taikhoan.findOne({
        where: { id }
      });
      if (tk) {
        return await database.taikhoan.update(data, {
          where: { id: Number(id) }
        });
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
  static async kiemtraemail(email) {
    try {
      return await await database.taikhoan.findOne({
        where: { email }
      });
     
    } catch (error) {
      throw error;
    }
  }
  static async quenmatkhau(email, matkhau) {
    try {
      let tk = await database.taikhoan.findOne({
        where: { email , kichhoat : true }
      });  
      if (tk) {       
        return await database.taikhoan.sequelize.query(
          `UPDATE public.taikhoans
          SET  email='`+email+`', matkhau='`+matkhau+`'         
          WHERE  email='`+email+`' `
        );
      }
      return error;
    } catch (error) {
      throw error;
    }
  }

  static async add(data) {
    try {
      let email = data.email;
      let tk = await database.taikhoan.findOne({
        where: { email }
      });
      if (tk) {
        return null;
      } else return await database.taikhoan.create(data);
    } catch (error) {
      throw error;
    }
  }
  static async getBylogin(email) {
    try {
      let tk = await database.taikhoan.findAll({
        where: { email , kichhoat : true}
      });

      if (!tk) {
        return 0;
      } else return tk;
    } catch (error) {
      throw error;
    }
  }

  // xác nhận email
  static async xacNhanEmail(token) {
    try {
      let tk = await database.taikhoan.findOne({
        where: { token }
      });
      if (tk) {
        return await database.taikhoan.update(
          { kichhoat: true, token: "" },
          {
            where: { token }
          }
        );
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getxacnhan(email) {
    try {
      let tk = await database.taikhoan.findAll({
        where: { email, kichhoat: true }
      });
      if (!tk) {
        return 0;
      } else {
        return error;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default dangnhapService;
