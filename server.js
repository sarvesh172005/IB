// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use(cors());
// app.use(express.json());


// let tasks = [
//         {text: "Learn JS" , completed : false },
//         {text : "Build Projects" , completed : false },
        
//     ];

// app.get("/",function(req,res){
//     res.send("Hello from server");
// });

// app.get("/tasks",function(req,res) {
//     res.json(tasks);
// });

// app.post("/tasks",function(req,res) {
//     let newtask = req.body;
//     tasks.push(newtask);
//     res.json({message: "Task Added"});
// });


// app.listen(3000,function(){
//     console.log("Server running on port 3000");
// });


const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const FILE_NAME = "tasks.json";

function readTasks() {
    let data = fs.readFileSync(FILE_NAME);
    return JSON.parse(data);
}

function saveTasks(tasks) {
    fs.writeFileSync(FILE_NAME,JSON.stringify(tasks));
}

app.get("/tasks",function(req,res) {
    let tasks = readTasks();
    res.json(tasks);
});

app.post("/tasks",function(req,res) {
    let tasks = readTasks();
    tasks.push(req.body);
    saveTasks(tasks);
    res.json( { message: "Task saved" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log("Server running");
});