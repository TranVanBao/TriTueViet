
import database from '../../Model/models';

class hocvienService {
  static async getAll() {
    try {      
      return await database.hocvien.findAll();
    } catch (error) {
      throw error;
    }
  }
  static async getByID(id){
      try {
          return await database.hocvien.findAll({
              where: { id }
          })
      } catch (error) {
        throw error;
      }
  }

  static async delete(id){
      try {
          return await database.hocvien.destroy({
              where:{ id }
          })
      } catch (error) {
          throw error;
      }
  }
  static async Save(data){
      try {
          return await database.hocvien.create(data);
      } catch (error) {
          throw error
      }
  }

  static async Update(id, data){
      try {
       let tk =     await database.hocvien.findOne({
              where: { id }
          })
          if(tk){
              await database.hocvien.update(data,{
                 where : { id : id }
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
      let tk = await database.hocvien.findOne({
        where: { sdt , email}
    })      
    if (tk) {
      return null
    } else{
        await database.hocvien.create(data);
        return data
    }
    
     
    } catch (error) {
      throw error;
    }
  }
 
}

export default hocvienService;