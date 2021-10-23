const express = require("express");
const mongoose = require("mongoose");
const pinRoute = require ("./routes/pins")
const userRoute = require ("./routes/users")

const app = express();
app.use(express.json())
require("dotenv").config();
const PORT = process.env.PORT;
// connection Data Base 
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("data base is connected");
  } catch (error) {
    console.log("data base can not connected");
  }
};
connectDB()


app.use("/map/pins",pinRoute)
app.use("/map/user",userRoute)

app.listen(PORT, () => {
  console.log(`backend server is running on ${PORT}`);
});
