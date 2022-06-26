const express = require("express");
const app=express();
const cors = require("cors");
const mongoose = require("mongoose")

app.use(cors());
app.use(express.json());

//connnect to mongoose
mongoose.connect('mongodb+srv://KhushiSingh:KhushiSingh@cluster0.23lekvz.mongodb.net/task_13DB', () => console.log('connected to Mongodb'));
//MONGODB CONNECTION
const connection = mongoose.connection;
connection.once('open', () => { console.log("MongoDB database connection established successfully"); });

var UserSchema=new mongoose.Schema({
  itemcode:String,
  name1:String,
  name2:String,
  price: Number,
  vendorname: String,
  date: String
})

const User = mongoose.model("Tanks",UserSchema)
console.log(User)

app.post('/user',async function(req,res){
  user = new User({
    itemcode: req.body.itemcode,
    name1: req.body.name1,
    name2: req.body.name2,
    price: req.body.price,
    vendorname: req.body.vendorname,
    date: req.body.date,
});
await user.save();
res.send(user);
})

app.get('/user', async function(req, res) {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
})

//req route
app.listen(3001,function(){
    console.log("express server is running on port 3001")
})