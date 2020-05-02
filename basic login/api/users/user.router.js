const {createUser,getUser,getUserById,deleteUserById,updateUserById,login}=require("./user.controller");
const router = require('express').Router();
const {checkToken }=require("../../auth/token_validaiton")



router.post("/", checkToken,createUser);
router.get("/",checkToken,getUser);
router.get("/:id",checkToken,getUserById);
router.patch("/",checkToken,updateUserById);
router.delete("/",checkToken,deleteUserById)
router.post("/login",login);


module.exports=router;