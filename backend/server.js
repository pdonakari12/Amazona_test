const express = require('express');
const  data =  require('./data');
const dotenv = require('dotenv');
const config = require('./config'); 
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoutes');

console.log("string",config);

dotenv.config();

const mongodbUrl=config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser:true,
    useUnifiedTopolgy:true,
    useCreateIndex:true
}).catch(error=>console.log(error.reason));


const app = express();

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
