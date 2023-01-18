import { ReqBody } from "../configs/queryConfig";
import { Ilogin, Ireg, Itoken } from "./dto/customer.dto";
import service from "./customer.service";
import { Response } from "express";

class CustomerController {
    async add(req: ReqBody<Ireg>, res: Response) {

        const model = await service.addUser({ ...req.body });

        return res.status(model.status).json(model.data);
    }
    async login(req: ReqBody<Ilogin>, res: Response) {
        const model = await service.loginUser({ ...req.body });

        return res.status(model.status).json(model.data);
    }
    verification(req: ReqBody<Itoken>, res: Response) {
        const model = service.verifyUser(req.body.token);

        return res.status(model.status).json(model.data);
    }
}

const controller = new CustomerController();

export default controller;