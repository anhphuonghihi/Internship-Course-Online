require("dotenv").config();
const express = require("express");
const port = process.env.PORT;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();



app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))


const colors = require('colors');
const mongoose = require('mongoose')

mongoose.set("strictQuery", false);
mongoose.connect(process.env.URI , { useNewUrlParser : true, useUnifiedTopology : true})
.then((res)=>console.log('> Connected...'.bgCyan))
.catch(err=>console.log(`> Error while connecting to mongoDB : ${err.message}`.underline.red ))


app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

const adminRouters = require("./src/routers/adminRouter");
const courseRouters = require("./src/routers/courseRouter");
const instructorRouters = require("./src/routers/instructorRouter");
const individualTraineeRouters = require("./src/routers/individualTraineeRouter");

app.use("/admin/", adminRouters);
app.use("/course/", courseRouters);
app.use("/instructor/", instructorRouters);
app.use("/individual/trainee/",individualTraineeRouters);