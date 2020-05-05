const server=require("./server")
const express=require("express")
app=express()
app.use("/",server)
app.listen(3000,()=>{
    console.log("server up and sunning on 3000")
})