
var database = require("../../Model/models")

class phonghocService {
  static async getAll() {
    try {      
      return await database.phonghoc.findAll();
    } catch (error) {
      throw error;
    }
  }
  // = sd cho thoi khoa bieu ========
  static async getsudung() {
    try {      
      return await database.phonghoc.findAll({
        where: {trangthai: 1}
      });
    } catch (error) {
      throw error;
    }
  }
  static async getByID(id){
      try {
          return await database.phonghoc.findAll({
              where: { id }
          })
      } catch (error) {
        throw error;
      }
  }

  static async delete(id){
      try {
          return await database.phonghoc.destroy({
              where:{ id }
          })
      } catch (error) {
          throw error;
      }
  }
  static async Save(data){
      try {
          return await database.phonghoc.create(data);
      } catch (error) {
          throw error
      }
  }

  static async Update(id, data){
      try {
       let tk =    await database.phonghoc.findOne({
              where: { id }
          })         
          if(tk){           
              await database.phonghoc.update(data,{
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
        let tenphonghoc =  data.tenphonghoc
      let tk = await database.phonghoc.findOne({
        where: { tenphonghoc }
    })      
    if (tk) {
      return null
    } else{
        await database.phonghoc.create(data);
        return data
    }
    
     
    } catch (error) {
      throw error;
    }
  }
 
}

module.exports = phonghocService;