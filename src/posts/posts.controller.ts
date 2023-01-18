import { ReqBody } from "../configs/queryConfig";
import { Request, Response } from "express";
import { Idelete, Ipost } from "./dto/posts.dto";
import service from "./posts.service";

class PostsController {
    async readPosts(req: Request<{},{},{},{ page: number, limit: number }>, res: Response) {
        const page: number = req.query.page || 1;
        const limit: number = req.query.limit || 10;

        const posts = await service.read(page, limit);
        return res.status(posts.status).json(posts.data);
    }
    async addPost(req: ReqBody<Ipost>, res: Response) {
        const thumbnail = req.files?.thumbnail;
        // @ts-ignore
        const model = await service.add(req.body, thumbnail);
        return res.status(model.status).json(model.data);
    }
    async deletePost(req: Request, res: Response) {
        const model = await service.delete(req.params.id);
        return res.status(model.status).json(model.data);
    }
    async updatePost(req: ReqBody<Ipost>, res: Response) {
        const model = await service.update(req.params.id, { ...req.body });
        return res.status(model.status).json(model.data);
    }
    async getPost(req: Request<{ id: string }>, res: Response) {
        const model = await service.get(req.params.id);
        return res.status(model.status).json(model.data);
    }
    async searchPost(req: Request<{},{},{},{ title: string, page: number, limit: number }>, res: Response) {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const model = await service.search(req.query.title, page, limit);
        return res.status(model.status).json(model.data);
    }
}

const controller = new PostsController();
export default controller;