const mqtt = require("mqtt")
const express = require("express")
const client = mqtt.connect("mqtt://localhost:1234")
const topic = "test123"
const app = express();
const path = require("path");

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/",(req,res)=>{
    res.render("index")
})

app.post("/message",(req,res)=>{
    message = req.body.message
    client.publish(topic,message)
    console.log(`Message was sent to broker\n message:${message}`)
    res.render("index")
})

app.listen(3000, () => {
    console.log("Listening")
})