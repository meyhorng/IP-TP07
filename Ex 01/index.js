require("dotenv").config();
const express= require('express')
const fs=require('fs')
const app=express()

app.get('/asset',(req,res)=>{
    // console.log(req.query['assetPath']);
    if(fs.existsSync(`./asset/${req.query['assetPath']}`)){
        res.sendFile(req.query['assetPath'],{root:'./asset/'})
    }else{
        res.send("<h1>File Not found</h1>")
    }
})

app.get('/',(req,res)=>{
    res.sendFile('asset/Activity Suggestion/index.html',{root:'./'})
})

app.listen(process.env.PORT ?? 3000,()=>{
    console.log(`Server run on http://localhost:${process.env.PORT ?? 3000}`);
})