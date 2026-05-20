import app from "./src/app.js"
import connecttodb from "./src/config/connettodb.js"









connecttodb()

app.listen(3000,()=>{
  console.log("server is runngin perfect ")
})