const express=require("express");
const app=express();
require("./db/conn");
const MensRanking=require("./models/mens");
const port=process.env.PORT  ||3000;

app.get("/",async(req,res)=>{
    res.send("he");
})
app.use(express.json());

app.post('/mens',async(req,res)=>{
    try{
       const addingMens=new MensRanking(req.body);
       const saveMens=await addingMens.save();
       res.status(201).send(saveMens);
    }catch(e){
 res.status(400).send(e);
    }
})
app.get("/mens",async(req,res)=>{
    try{
        const getmens=await MensRanking.find();
        res.send(getmens);

    }catch(e){
         res.send(e);
    }
})
app.get('/mens/:id',async(req,res)=>{
    try{
        const _id=req.params.id;
        const mensindi=await MensRanking.findById(_id);
        res.send(mensindi);
    }catch(e){
        res.status(404).send();
    }
   
})
app.patch('/mens/:id',async(req,res)=>{
    try{
       const _id=req.params.id;
       const updatemens=await MensRanking.findByIdAndUpdate(_id,req.body,{
           new:true
       });
       res.send(updatemens);

    }catch(e){
        res.send(e);
    }
})
app.listen(port,()=>{
    console.log(`connected to the port No ${port}`);
})