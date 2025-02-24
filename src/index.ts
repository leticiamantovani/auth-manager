import express from 'express';
import { LoginRouter } from './routes/login';
import { LoginController } from './controllers/loginController';
import { LoginService } from './services/loginService';
import config from './config';
import connectDb from './config/db';

const app = express();
const PORT = config.port;

app.use(express.json()); 

const loginService = new LoginService();
const loginController = new LoginController(loginService);
const loginRouter = new LoginRouter(loginController);
app.use('/login', loginRouter.getRouter());


const appStart = async () => {
  await connectDb();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

appStart();

