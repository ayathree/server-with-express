import { Request, Response } from "express";
import { authServices } from "./auth.service";
import { authRoutes } from "./auth.route";

const loginUser=async(req:Request, res:Response)=>{
    const {email,password}=req.body;
    try {
        const result = await authServices.loginUser(email,password)
       
        // console.log(result.rows[0])
        // res.send({message:"data inserted"})
        res.status(200).json({
            success:true,
            message:"login successful",
            data:result,
        })
        
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const authController={
    loginUser
}