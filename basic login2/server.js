const express =require("express");
const bodyParser = require('body-parser')
const {compareSync,compare}=require('bcrypt')
const app=express()
const router=express.Router()
require("./db_file/database")
// boot=require("./SRC/bootstrap")();
db=require("./models/sign")
console.log(db)


router.use(bodyParser.json())

// app.use("/")
//get all records from database
router.get("/all",(req,res)=>{
    db.findAll().then((result) => res.json(result))
});

router.post("/",(req,res)=>{

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
})

router.post("/login",async(req,res)=>{
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
    

})
router.delete("/",(req,resp)=>{
    console.log(req.body.id)
    try{
        db.destroy({where:{id:req.body.id}});
        resp.end("record deleted successfully")
    }
    catch(err){
        console.log(err)
    }
})
router.patch('/',async(req,resp)=>{
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

})
module.exports = router;

