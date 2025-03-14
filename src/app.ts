import express from 'express';
import { UserRouter } from './routes/userRoutes';
import { UserController } from './controllers/userController';
import { UserService } from './services/userService';
import config from './config';
import connectDb from './config/db';
import UserRepositoryClass from './repositories/userRepository';
import path from "path";

const app = express();
const PORT = config.port;

// EJS config
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRepository = new UserRepositoryClass();
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const userRouter = new UserRouter(userController);

app.use("/", userRouter.getRouter());

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

const appStart = async () => {
  await connectDb();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

appStart();

