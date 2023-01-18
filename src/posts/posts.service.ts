import { client } from "../configs/dbConfig";
import { Ipost } from "./dto/posts.dto";
import fs from 'fs/promises';
import { UploadedFile } from 'express-fileupload';
import axios from "axios";
import { PostsTools } from "./posts.tools";


class PostsService {
    private tools: PostsTools;
    constructor () {
        this.tools = new PostsTools();
    }
    async read(page: number, limit: number) {
        try {
            const postsCount = await client.post.count();
            const posts = await client.post.findMany({
                take: page * limit,
                skip: (page- 1) * limit
            });

            return { data: { posts, pages: Math.ceil(postsCount / limit) }, status: 200 }
        } catch (error) {
            return { data: { msg: error }, status: 502 }
        }
    }
    async add(body: Ipost, file: UploadedFile) {
        try {
            const thumbnail = await this.tools.uploadFile(file.name);
            const post = await client.post.create({
                data: { ...body, thumbnail: thumbnail.fileUrl },
            });
            
            await fs.writeFile(thumbnail.filePath, file.data);
            return { data: { post }, status: 200 };
        } catch (error) {
            console.log(error);
            
            return { data: { msg: error }, status: 403 };
        }
    }
    async delete(id: string) {
        try {
            const post = await client.post.delete({ where: { id } });
            const photoQuery = await axios.delete(`${post.thumbnail}`);

            if (photoQuery.status === 200) {
                return { data: { post }, status: 200 };
            }
            throw new Error();
        } catch (error) {
            return { data: { msg: error }, status: 404 };
        }
    }
    async update(id: string, body: Ipost) {
        try {
            const post = await client.post.update({
                where: { id },
                data: { ...body },
                include: { customer: true }
            });

            return { data: { post }, status: 200 };
        } catch (error) {
            return { data: { msg: error }, status: 200 };
        }
    }
   async get(id: string) {
    try {
        const post = await client.post.findUnique({ 
            where: { id }, 
            include: { customer: true, comments: true } });
        return { data: { post }, status: 200 };
    } catch (error) {
        return { data: { msg: error }, status: 404 }
    }
   }
   async search(title: string, page: number, limit: number) {
    try {
        const count = await client.post.count({ 
            where: { title: { contains: title } }, 
        });
        const posts = await client.post.count({ 
            where: { title: { contains: title } }, 
            take: page * limit,
            skip: (page- 1) * limit
        });

        return { data: { posts, pages: Math.ceil(count / limit) }, status: 200 };
    } catch (error) {
        return { data: { msg: error }, status: 404 };
    }
  }
}

const service = new PostsService();
export default service;