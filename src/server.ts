import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { config } from 'dotenv';

config();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(fileUpload({ limits: { fileSize: 1728640 }, abortOnLimit: true }));
app.use('/user', require('./customer/customer.module'));
app.use('/post', require('./posts/posts.module'));
app.use('/comment', require('./comments/comment.module'));
app.use('/uploads', require('./uploadSystem/upload.module'));

const port = process.env.PORT || 5000;
app.listen(port, (): void => {
    console.log(`sever run in port ${port}`);
})