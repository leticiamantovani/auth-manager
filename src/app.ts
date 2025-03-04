import express from 'express';
import { UserRouter } from './routes/userRoutes';
import { UserController } from './controllers/userController';
import { UserService } from './services/userService';
import config from './config';
import connectDb from './config/db';
import UserRepositoryClass from './repositories/userRepository';

const app = express();
const PORT = config.port;

app.use(express.json()); 

const userRepository = new UserRepositoryClass();
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const userRouter = new UserRouter(userController);
app.use('/', userRouter.getRouter());


const appStart = async () => {
  await connectDb();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

appStart();

