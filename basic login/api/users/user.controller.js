const{create, getUserById, updateUserById,deleteUserById,getUser,getUserByEmail}=require("./user.service");
const {genSaltSync, hashSync,compareSync}= require('bcrypt')
const{sign}=require('jsonwebtoken')

module.exports={
    createUser:(req,res) =>{
        const body=req.body;
        const salt =genSaltSync(10);
        body.password=hashSync(body.password,salt);
        create(body,(err,result)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    messgae: "db connection error"
                });
            }
            return res.status(200).json({
                success:1,
                data:result
            });
        });
    },
    getUserById:(req,res)=>{
        const id=req.params.id
        getUserById(id,(err,result)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!result){
                return res.json({
                    success:0,
                    messgae:"record not found"
                });
            }
            return res.json({
                success:1,
                data:result
            });
        });
    },
    getUser:(req,res)=>{
        getUser((err,result)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!result){
                return res.json({
                    success:0,
                    messgae:"record not found"
                });
            }
            return res.json({
                success:1,
                data:result
            });
        });
    },
    updateUserById:(req,res)=>{
        const body=req.body
        const salt=genSaltSync(10);
        body.password= hashSync(body.password,salt)
        updateUserById(body,(err,result)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!result){
                return res.json({
                    sucess:0,
                    message:"failed to pdate user"
                })
            }
            return res.json({
                success:1,
                messgae:"updated successfully"
            });
        
        });
        
    },
    deleteUserById:(req,res)=>{
        const data=req.body
        deleteUserById(data,(err,result)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!result){
                return res.json({
                    success:0,
                    messgae:"record not found"
                });
            }
            return res.json({
                success:1,
                data:"user deleted successfully"
            });
        });
    },
    login:(req,res)=>{
        const body=req.body
        getUserByEmail(body.email,(err,results)=> {
            if(err){
                console.log(err)
            }
            if(!results){
                res.json({
                    success:0,
                    data:"Invalid email or password"    
                });
            }
            const result= compareSync(body.password,results.password)
            if(result){
                results.password=undefined
                const jsontoken=sign({result:results},"123",{
                    expiresIn:"1h"
                });
                return res.json({
                    success:1,
                    message:"login successfully",
                    token:jsontoken

                }); 
                
            }
            else{
                return res.json({
                    success:0,
                    message:"invaid id or password"
                });
            }

        });

    }
};