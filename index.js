const express=require('express')
const dotenv=require("dotenv")
const mongoose=require('mongoose')
const bodyParser=require('body-parser')


dotenv.config();


//connect database
mongoose.connect(process.env.DARABASE_CONNECT,{ useNewUrlParser: true,useUnifiedTopology:true },()=>{
    console.log("connected to db    ")
});

const app=express();
//import route
const authRoute=require('./routes/auth')

//middleware for json body parser
app.use(bodyParser.json());

//added route middleware
app.use('/api/user',authRoute);

app.listen(process.env.PORT||3000,()=>{
    console.log('listening port 3000...');
});


