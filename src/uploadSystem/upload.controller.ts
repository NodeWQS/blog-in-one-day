import { Response, Request } from "express";
import { client } from "../configs/dbConfig";
import service from "../posts/posts.service";
import path from "path";
import fs from 'fs/promises';

class UploadController {
    async getPhoto(req: Request, res: Response) {
        try {
        // @ts-ignore
        const { name } = req.params;
        const filePath = path.join(path.dirname(path.dirname(__dirname)), `uploads/${name}`);
        
        return res.status(200).sendFile(filePath);
        } catch (error) {
        return res.status(404).json({ msg: 'file not found.' })
        }
    }
    async delete(req: Request, res: Response) {
        try {
        // @ts-ignore
        const { name } = req.params;
        const filePath = path.join(path.dirname(path.dirname(__dirname)), `uploads/${name}`);
        await fs.rm(filePath);
        return res.status(200).json({ msg: 'file deleted.' });
        } catch (error) {
        return res.status(404).json({ msg: 'file not found.' })
        }
    }
    async update(req: Request<{ name: string }>, res: Response) {
        const file = req.files?.thumbnail;
        const filePath = path.join(path.dirname(path.dirname(__dirname)), `uploads/${req.params.name}`);
        // @ts-ignore
        const photo = await service.uploadFile(file.name);
        await fs.rm(filePath);
        // @ts-ignore
        await fs.writeFile(photo.filePath, file.data)
        const post = await client.post.update({
            where: { thumbnail: `${process.env.HOST}/uploads/${req.params.name}`},
            data: { thumbnail: photo.fileUrl }
        });
        return res.status(200).json(post);
    }
}

const controller = new UploadController();
export default controller;