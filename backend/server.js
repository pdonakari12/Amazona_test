const express = require('express');
const  data =  require('./data');
const dotenv = require('dotenv');
const config = require('./config'); 
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoutes');
const cors=require('cors');
const bodyParser=require('body-parser');

const app = express();
app.use(bodyParser.json());
var whitelist = ['http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// Then pass them to cors:
app.use(cors(corsOptions));



dotenv.config();

const mongodbUrl=config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser:true,
    useUnifiedTopolgy:true,
    useCreateIndex:true
}).catch(error=>console.log(error.reason));




app.use("/api/users",userRoute);

app.get("/api/products/:id",(req , res) => {
   const productId= req.params.id;
   const product= data.products.find(x => x._id === productId);
   if(product)
   res.send(product);
   else
   res.status(404).send({ msg: "Product Not Found." })

});

app.get("/api/products",(req,res)=>
{
    
    res.send(data.products);
});


app.listen(5000, () => {console.log("Server started at http://localhost:5000")});
