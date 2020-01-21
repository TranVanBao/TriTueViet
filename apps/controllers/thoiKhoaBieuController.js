import { validationResult } from "express-validator";
import thoiKhoaBieuService from "../services/thoiKhoaBieuService";


class thoiKhoaBieuController {
  static async getAll(req, res) {
    if (req.session.user) {
      try {
        const all = await thoiKhoaBieuService.getAll();
        if (all.length > 0) {
          util.setSuccess(200, "KH ton tai", all);
        } else {
          util.setSuccess(200, "Khach hang found");
        }
        return util.send(res);
      } catch (error) {
        util.setError(400, error);
        return util.send(res);
      }
    } else {
      return res.redirect("/");
    }
  }

  static async Delete(req, res) {
    if (req.session.user) {
      let { id } = req.params;
      if (!Number(id)) {
        util.setError(400, "Please provide a numeric value");
        return util.send(res);
      }
      try {
        let Xoa = await thoiKhoaBieuService.delete(id);
        if (Xoa) {
          util.setSuccess(200, "TK xoa thanh cong");
        } else {
          util.setError(400, "Xoa khong thanh cong");
        }
        return util.send(res);
      } catch (error) {
        util.setError(400, error);
        return util.send(res);
      }
    } else {
      return res.redirect("/");
    }
  }

  static async add(req, res) {
    let validate = validationResult(req);
    if (!validate.isEmpty()) {
      util.setError(400, validate.array);
      return util.send(res);
    }
    let data = {
      ...req.body,
      matkhau: bcrypt.hashSync(req.body.matkhau, bcrypt.genSaltSync(10))
    };
    try {
      const created = await thoiKhoaBieuService.add(data);
      util.setSuccess(201, "Book Added!", created);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updated(req, res) {
    const altered = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }
    try {
      const update = await thoiKhoaBieuService.Update(id, altered);
      if (!update) {
        util.setError(404, `Cannot find tai khoan with the id: ${id}`);
      } else {
        util.setSuccess(200, "khach hang updated", updateBook);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async get1(req, res) {
    if (req.session.user) {
      const { id } = req.params;

      if (!Number(id)) {
        util.setError(400, "Please input a valid numeric value");
        return util.send(res);
      }

      try {
        const thetk = await thoiKhoaBieuService.getByID(id);

        if (!thetk) {
          util.setError(404, `Cannot find tai khoan with the id ${id}`);
        } else {
          util.setSuccess(200, "Found tai khoan", thetk);
        }
        return util.send(res);
      } catch (error) {
        util.setError(404, error);
        return util.send(res);
      }
    } else {
      return res.redirect("/");
    }
  }
}

export default thoiKhoaBieuController;
