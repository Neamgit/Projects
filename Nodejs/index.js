const express = require("express");
const { json } = require("express/lib/response");
const app = express();
const DB = require("./database").connectDB; //we are referring to it

//Routes
    const authRouter = require("./routes/authRoutes");


//connect to our DB
DB();

app.use(express.json());
app.use("/api/auth",authRouter)
app.listen(process.env.PORT,()=>{
    console.log(`Listening on port: ${process.env.PORT}`);
});