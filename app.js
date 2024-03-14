require("dotenv").config();
require('express-async-errors');

const connectDB = require("./db/connect");
const express = require("express");
const cors = require('cors')
const app = express();
const mainRouter = require("./routes/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use("/api/v1", mainRouter);

const port = process.env.PORT || 3000;
// app.listen(port, function(){
//     console.log("SERVER STARTED ON localhost:8000");     
// })

const start = async () => {

    try {        
        console.log(require('crypto').randomBytes(32).toString('hex'))
        console.log(process.env.MONGO_URI)
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        })

    } catch (error) {
       console.log(error); 
    }
}

start();

