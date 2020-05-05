const express =require("express");
const bodyParser = require('body-parser')
const {compareSync,compare}=require('bcrypt')
require("./db_file/database")
const db=require("./models/sign")



module.exports={
    createUser:(req,res)=>{
        try{
            db.create({ 
                firstname: req.body.firstname, 
                lastname:req.body.lastname, 
                gender:req.body.gender,
                number:req.body.number, 
                email:req.body.email, 
                password:req.body.password
            })
            res.end("user added succesfully")
        }
        catch(err){
            console.log(err)
        }
    },
    login:async(req,res)=>{
        try{
            const det=await db.findAll({where:{email:req.body.email}})
            // console.log(det[0])
            console.log(compareSync(det[0].password,req.body.password))
            if(compareSync(req.body.password,det[0].password)){
                res.end("logged in successfully")
            }
            else{
                res.end("invalid username or password")
            }
        }
        catch(err){
            console.log(err)
        }
    },
    deleteUser:(req,resp)=>{
        console.log(req.body.id)
        try{
            db.destroy({where:{id:req.body.id}});
            resp.end("record deleted successfully")
        }
        catch(err){
            console.log(err)
        }
    },
    updateUser:async(req,resp)=>{
        console.log(req.body.id)
        try{
            const n=await db.update(
            {
                firstname: req.body.firstname, 
                lastname:req.body.lastname, 
                gender:req.body.gender,
                number:req.body.number, 
                email:req.body.email
            },
            {
                where:{id:req.body.id}
            });
            resp.end("user updated successfully")
        }catch(err){
            resp.end("invalid id ")
        }
    }
}