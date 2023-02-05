const express=require("express")
const app=express();
const cookieParser=require("cookie-parser")
errorMiddleware=require("./middleware/error")

app.use(express.json())
app.use(cookieParser())
 //Routes import
 const product=require("./routes/ProductRoute")
 const user=require("./routes/userRoute")

 app.use("/api/v1", product);
 app.use("/api/v1", user);

 //middleware for error
 app.use(errorMiddleware)

module.exports=app;