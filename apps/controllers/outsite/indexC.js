var date = require("s-date")
var lopHocService = require("../../services/lopHocService")
var baivietService = require("../../services/baivietService")
class indexController {
  static async getAll(req, res) {  
      try {          
        let user = []
        if(req.session.user){
          user = req.session.user
        }          
      const data1 = await lopHocService.getAllOusite();      
      const baiviet = await baivietService.getNew();  
      const tintuc = await baivietService.getNeWBV()  
       const data =  data1[0]
        if (data.length > 0) {
          res.render("../views/outsite/index.ejs", { data, date, user,baiviet,tintuc });
        } else {
          res.render("../views/outsite/index.ejs", { data, date ,user,baiviet,tintuc});
        }
        return 0;
      } catch (error) {
        return 0;
      }
   
  }
}

module.exports = indexController;
