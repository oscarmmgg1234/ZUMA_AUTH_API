const express = require('express')
const https = require("https");
const path = require('path');
const fs = require("fs")
const  server = express()
const env = require('./env.json')
const {sign_in} = require('./auth_api/auth_wrapper')
var bodyParser = require('body-parser')

server.timeout = env.server_timeout
bodyParser.urlencoded({extended: false});
server.use(bodyParser.json());

const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
  };
  
const sslServer = https.createServer(sslOptions, server);
  
server.post("/signin", (req,res)=>{
    try{
    sign_in({email: req.body.email,password: req.body.password}, (data)=>{
        res.send(data);
    })
} catch(err){
    res.status(500).send("Internal server error");
}

})

server.get("/public/juan_image", (req, res)=>{
    res.sendFile(path.join(__dirname,"public/assets/images/screen.png"))
})

server.get("/public/jennifer_image", (req, res)=>{
    res.sendFile(path.join(__dirname,"public/assets/images/jennifer.png"))
})



sslServer.listen(env.server_port,()=>{console.log(`Server listening on port ${env.server_port}`)})