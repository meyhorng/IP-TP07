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
app.get('/detail/:id',(req,res)=>[
    fs.writeFile('./asset/Book_Library/id_data.js',`const id=${req.params.id}` , err => {
        if (err) {
            console.error(err)
            return
        }
        res.sendFile('asset/Book_Library/view.html',{root:'./'})
    })
    
])

app.get('/',(req,res)=>{
    res.sendFile('asset/Book_Library/index.html',{root:'./'})
})

app.listen(process.env.PORT ?? 3000,()=>{
    console.log(`Server run on http://localhost:${process.env.PORT ?? 3000}`);
})