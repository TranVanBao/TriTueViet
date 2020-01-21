
import database from '../../../Model/models';

class thoikhoabieuService {
  static async getAll() {
    try {      
      return await database.thoikhoabieu.findAll();
    } catch (error) {
      throw error;
    }
  }
  static async getByID(id){
      try {
          return await database.thoikhoabieu.findAll({
              where: { id }
          })
      } catch (error) {
        throw error;
      }
  }

  static async delete(id){
      try {
          return await database.thoikhoabieu.destroy({
              where:{ id }
          })
      } catch (error) {
          throw error;
      }
  }
  static async Save(data){
      try {
          return await database.thoikhoabieu.create(data);
      } catch (error) {
          throw error
      }
  }

  static async Update(id, data){
      try {
       let tk =      await database.thoikhoabieu.findOne({
              where: { id }
          })
          if(tk){
             return await database.thoikhoabieu.update(data,{
                 where : { id : Number(id) }
             })
          }
          return null;


      } catch (error) {
          throw error
      }
  }
 
}

export default thoikhoabieuService;