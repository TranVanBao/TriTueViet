
import database from '../../Model/models';

class dangkyService {
  static async getAll() {
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
  static async getByID(id){
      try {
          return await database.dangky.findAll({
              where: { id }
          })
      } catch (error) {
        throw error;
      }
  }

  static async delete(id){
      try {
          return await database.dangky.destroy({
              where:{ id }
          })
      } catch (error) {
          throw error;
      }
  }
  static async Save(data){
      try {
          return await database.dangky.create(data);
      } catch (error) {
          throw error
      }
  }

  static async Update(id, data){
      try {
       let tk =     await database.dangky.findOne({
              where: { id }
          })
          if(tk){
              await database.dangky.update(data,{
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
      let tk = await database.dangky.findOne({
        where: { sdt , email}
    })      
    if (tk) {
      return null
    } else{
        await database.dangky.create(data);
        return data
    }
    
     
    } catch (error) {
      throw error;
    }
  }
 
}

export default dangkyService;