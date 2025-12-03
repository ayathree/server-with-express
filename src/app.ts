import express,{Request,Response} from "express";

import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { authRoutes } from "./modules/auth/auth.route";




const app = express();



//parser
app.use(express.json());
// app.use(express.urlencoded())

//initializing db
initDB();



app.get('/', logger, (req:Request, res:Response) => {
  res.send('Hello Pooja!')
});

//users CRUD

app.use("/users", userRoutes)

//users auth
app.use("/auth", authRoutes)



//getting single id
// app.get("/users/:id",)

// app.put("/users/:id",)

// app.delete("/users/:id",)

//todo crud


export default app;
