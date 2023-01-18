import { client } from "../configs/dbConfig";
import { Icomment } from "./dto/comment.dto";

class CommentService {
    // async getComments(post_id: string) {
    //     try {
    //         const comments 
    //     } catch (error) {
            
    //     }
    // }
    async add(body: Icomment) {
        try {
            const comment = await client.comment.create({
                data: { ...body }
            });
            return { data: { comment }, status: 200 };
        } catch (error) {
            return { data: { msg: error }, status: 403 };
        }
    }
    async delete(id: string) {
        try {
            const comment = await client.comment.delete({ where: { id } });
            return { data: { success: true }, status: 200 };
        } catch (error) {
            return { data: { success: false, msg: error }, status: 404 };
        }
    }
}

const service = new CommentService();

export default service;