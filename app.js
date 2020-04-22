const express = require('express')
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
var multer = require('multer');

app.use(cors());
app.use(bodyParser.json({ type: 'json' }))
app.use(express.static(path.join(__dirname, 'src/app')));

var storage = multer.diskStorage({
  // destination
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage });

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

let instaImg = new mongoose.Schema({
  img: { data: Buffer, contentType: String }
});


let InstaModel = mongoose.model('InstaModel', instaSchema);
let InstaImgModel = mongoose.model('InstaImgModel', instaImg);




// app.use(express.static(path.join(__dirname, 'dist/insta')));

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

 app.post('/imgSend', upload.array("uploads[]", 12), function (req, res) {
  console.log('imageData', req.body);
  console.log('files', typeof(req.files.filename));
  InstaImgModel.create({
    img:req.files
  },(err,data)=>{
    if(err){
      console.log('error in model', err)
    }else{
      console.log('ImgData', data)
    }

  })
 })

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'dist/insta/index.html'))
//  })



const port = process.env.PORT || 4800

app.listen(port, function () {
  console.log(`CORS-enabled web server listening on port ${port}`)
})
