import { Request, Response } from "express";
import { ReqBody } from "../configs/queryConfig";
import service from "./comment.service";
import { Icomment } from './dto/comment.dto';

class CommentController {
    async addComment(req: ReqBody<Icomment>, res: Response) {
        const model = await service.add(req.body);
        return res.status(model.status).json(model.data);
    }
    async deleteComment(req: Request<{ id: string }>, res: Response) {
        const model = await service.delete(req.params.id);
        return res.status(model.status).json(model.data);
    }
}

const controller = new CommentController();

export default controller;
