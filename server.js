
const app=require("./backend/app");
var http = require('http');
const bodyParser = require('body-parser');


const host='127.0.0.1';
const port=process.env.PORT || "5000";




app.set("port",port);

const server = http.createServer(app);

server.listen(port,host,()=>{
    console.log('Server is listening at port '+port);
})
