import { Ireg, Ilogin } from "./dto/customer.dto";
import { client } from "../configs/dbConfig";
import { compare, hash } from "bcryptjs";
import { verify, sign } from "jsonwebtoken";
import { TOKEN } from "../configs/config";


class CustomerService {
   async addUser(body: Ireg) {
      try {
         const { password, username, email } = body;
         const passwordHash = await hash(password.toLowerCase(), 10);
         const token = sign({ username, password, role: "USER" }, TOKEN);
         const user = await client.customer.create({
            data: { ...body, password: passwordHash, token },
            select: { 
               id: true,
               username: true, 
               email: true, 
               name: true,
               lastname: true, 
               date: true, 
               role: true 
            }
         });

         return { data: { user }, status: 201 }
      } catch (error) {
         console.log(error);
         return { data: { msg: error }, status: 403 }
      }
   }
   async loginUser(body: Ilogin) {
      try {
         const user = await client.customer.findUnique({ where: { username: body.username } });
         // @ts-ignore
         const validation = await compare(body.password.toLowerCase(), user?.password);
         
         if (user && validation) {
            return { data: { token: user.token }, status: 200 };
         }
         return { data: { msg: 'username or password not correct.' }, status: 401 };
      } catch (error) {
         return { data: { msg: 'username or password not correct.' }, status: 401 };
      }
   }
   verifyUser(token: string) {
      try {
         const data = verify(token, TOKEN);

         return { data, status: 200 };
      } catch (error) {
         return { data: { msg: 'token not found.' }, status: 404 };
      }
   }
}

const service = new CustomerService();
export default service;