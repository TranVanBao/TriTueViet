

var database = require("../../Model/models")

class giangvienService {
  static async getAll() {
    try {      
      return await database.giangvien.findAll();
    } catch (error) {
      throw error;
    }
  }
  // ==========cho lop hoc
  static async getcolam() {
    try {      
      return await database.giangvien.findAll({
        where: {trangthai:1}
      });
    } catch (error) {
      throw error;
    }
  }
  static async getByID(id){
      try {
          return await database.giangvien.findAll({
              where: { id }
          })
      } catch (error) {
        throw error;
      }
  }

  static async delete(id){
      try {
          return await database.giangvien.destroy({
              where:{ id }
          })
      } catch (error) {
          throw error;
      }
  }
  static async Save(data){
      try {
          return await database.giangvien.create(data);
      } catch (error) {
          throw error
      }
  }

  static async Update(id, data){
      try {
       let tk =    await database.giangvien.findOne({
              where: { id }
          })         
          if(tk){           
              await database.giangvien.update(data,{
               where : { id }
             })            
             return data
          }
          return null;


      } catch (error) {
          throw error
      }
  }

   
  static async add(data) {
    try {
      let sdt = data.sdt
      let email = data.email
      let tk = await database.giangvien.findOne({
        where: { sdt , email}
    })      
    if (tk) {
      return null
    } else{
        await database.giangvien.create(data);
        return data
    }
    
     
    } catch (error) {
      throw error;
    }
  }
 
}

module.exports = giangvienService;