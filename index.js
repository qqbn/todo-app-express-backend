const express = require("express");
const cors = require("cors");
const e = require("express");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("no działa!");
});

let todoList = ["1", "2", "3"];

app.post("/todos", (req, res) => {
    todoList.push(req.body);
    res.send(todoList);
    res.status(200).end();
});

app.get("/todos", (req, res) => {
    console.log(todoList);
    res.send(todoList);
    res.status(200).end();
});

app.delete("/todos/:id", (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const index = todoList.findIndex(element => element.id === taskId);
    if (index > -1) {
        todoList.splice(index, 1);
    } else {
        res.status(404).end();
    }
    res.status(200).end();
});

app.patch("/todos/:id", (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const updatedElement = req.body;
    todoList.forEach(element => {
        if (element.id === taskId) {
            element.taskText = updatedElement.taskText;
            element.date = updatedElement.date;
        }
    });
});

const port = process.env.PORT || 5600;

app.listen(port, () => {
    console.log("START");
});
