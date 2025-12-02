import express,{Request,Response} from "express";

import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";




const app = express();
const port = config.port;


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





//getting single id
app.get("/users/:id",async(req:Request,res:Response)=>{
    // console.log(req.params.id);
   try {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [req.params.id]);
    if(result.rows.length===0){
        res.status(404).json({
        success:false,
        message:"user not found",
        })
    }
    else{
        res.status(200).json({
             success:true,
        message:"user fetched successfully",
        data:result.rows[0]
        })
    }
    
   } catch (error:any) {
    res.status(500).json({
        success:false,
        message:error.message,
    })
    
   }
})

app.put("/users/:id",async(req:Request,res:Response)=>{
    // console.log(req.params.id);
    const {name,email}=req.body;
   try {
    const result = await pool.query(`UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`, [name, email, req.params.id]);
    if(result.rows.length===0){
        res.status(404).json({
        success:false,
        message:"user not found",
        })
    }
    else{
        res.status(200).json({
             success:true,
        message:"user updated successfully",
        data:result.rows[0]
        })
    }
    
   } catch (error:any) {
    res.status(500).json({
        success:false,
        message:error.message,
    })
    
   }
})

app.delete("/users/:id",async(req:Request,res:Response)=>{
    // console.log(req.params.id);
   try {
    const result = await pool.query(`DELETE FROM users WHERE id = $1`, [req.params.id]);
    if(result.rowCount===0){
        res.status(404).json({
        success:false,
        message:"user not found",
        })
    }
    else{
        res.status(200).json({
             success:true,
        message:"user deleted successfully",
        data:result.rows,
        })
    }
    
   } catch (error:any) {
    res.status(500).json({
        success:false,
        message:error.message,
    })
    
   }
})

//todo crud


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
