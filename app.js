const express=require("express")
const path=require("path");
const  fs = require("fs");
const app=express()
const mongoose = require('mongoose');
const bodyparser=require("body-parser")
mongoose.connect('mongodb://localhost/DanceClass', { useNewUrlParser: true, useUnifiedTopology: true });

const hostname = '127.0.0.1';
const port = process.env.PORT || 5000;


const ContactSchema = new mongoose.Schema({
  name: String,
  age: String,
  email: String,
  phone: String,

});

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))


var Contact = mongoose.model('Contact', ContactSchema);

app.use('/static',express.static('static'))

app.set('view engine','pug')

app.set('views',path.join(__dirname,'views'))


app.get("/",(req,res)=>{
    const con="Mera naam sujan"
    const params={}

   res.status(200).render("home.pug",params)

})

app.get("/contact",(req,res)=>{


 res.status(200).render("contact.pug")

})


app.post("/contact",(req,res)=>{
  var myData=new Contact(req.body);
  myData.save().then(()=>{
    res.send("Saved in Database")
  }).catch(()=>{
    res.status(400).send("Not Saved in Database")

  });

//  res.status(200).render("contact.pug")

})





app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });




//  "test": "echo \"Error: no test specified\" && exit 1"