const{createUser,login,deleteUser,updateUser}=require("./controller")
const express =require("express");
const app=express()
const router=express.Router()
const db=require("./models/sign")
console.log(db)


router.use(bodyParser.json())

router.get("/all",(req,res)=>{
    db.findAll().then((result) => res.json(result))
});

router.post("/",createUser)
router.post("/login",login)
router.delete("/",deleteUser)
router.patch('/',updateUser)
module.exports = router;

