const express=require('express')
const app=express()
const db=require('./model/connection')

app.use(express.json())
// create user\
app.post("/addUser",(req,res)=>{
    const user={name:req.body.name,email:req.body.email,city:req.body.city,phone:req.body.phone}
    let sql='insert into `employee` set ?'
    db.query(sql,user,(err,result)=>{
        if(err) throw err
        else
        res.json(result)
    })
})

//showUser
app.get("/showUser",(req,res)=>{
    let sql="select * from `employee`"
    db.query(sql,(err,result)=> {
    if(err) throw err
    else 
        res.json(result)
    })
})
// show particuler user        
app.get("/showUser/:email",(req,res)=>{
    let sql=`select * from employee where email='${req.params.email}'`
    db.query(sql,(err,result)=>{
        if(err) throw err
        else
        res.json(result)
    })
})
// delete user
app.delete("/deleteuser/:email",(req,res)=>{
    let emailId=req.params.email
    let sql=`delete from employee where email='${emailId}'`
    db.query(sql,(err,result)=>{
        if(err) throw err
        else
        res.json(result)
    })
})
// updateUser
app.post("/updateUser/:email",(req,res)=>{
    let email=req.params.email
    const name=req.body.name
    const city=req.body.const
    const phone=req.body.params

    let sql =`update employee set name='${name}',phone='${phone}',city='${city}'`
    db.query(sql,(err,result)=>{
        if(err) throw err
        else
        res.json(result)
    })
})
const port=process.env.port||3000
app.listen(port,()=>console.log(`server is runnig at ${port}`))