import date from "s-date";
import lopHocService from "../../services/lopHocService";
import baivietService from "../../services/baivietService";
class indexController {
  static async getAll(req, res) {  
      try {          
        let user = []
        if(req.session.user){
          user = req.session.user
        }          
      const data1 = await lopHocService.getAllOusite();      
      const baiviet = await baivietService.getNew();     
       const data =  data1[0]
        if (data.length > 0) {
          res.render("../views/outsite/index.ejs", { data, date, user,baiviet });
        } else {
          res.render("../views/outsite/index.ejs", { data, date ,user,baiviet});
        }
        return 0;
      } catch (error) {
        return 0;
      }
   
  }
}

export default indexController;
