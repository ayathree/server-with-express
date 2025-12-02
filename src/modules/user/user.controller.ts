import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.service";

const createUser = async(req:Request, res:Response)=>{
    const {name,email}=req.body;
try {
    const result = await userServices.createUser(name,email)
    // console.log(result.rows[0])
    // res.send({message:"data inserted"})
    res.status(201).json({
        success:true,
        message:"data inserted successfully",
        data:result.rows[0]
    })
    
} catch (error:any) {
    res.status(500).json({
        success:false,
        message:error.message
    })
}
    
  
}

const getUser = async(req: Request, res:Response)=>{
    try {
        const result=await userServices.getUser();
        res.status(200).json({
            success:true,
            message:"Users retrieved successfully",
            data:result.rows
        })
        
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:error.message,
            details:error
        })
    }
}

const getSingleUser= async(req:Request,res:Response)=>{
    // console.log(req.params.id);
   try {
    const result =await  userServices.getSingleUser(req.params.id as string)
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
}

const updateUser = async(req:Request,res:Response)=>{
    // console.log(req.params.id);
    const {name,email}=req.body;
   try {
    const result = await userServices.updateUser(name,email,req.params.id as string)
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
}

const deleteUser = async(req:Request,res:Response)=>{
    // console.log(req.params.id);
   try {
    const result = await userServices.deleteUser(req.params.id as string)
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
}

export const userControllers={
    createUser, getUser, getSingleUser,updateUser,deleteUser
}