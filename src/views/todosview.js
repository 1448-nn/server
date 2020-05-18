const express = require("express");

const Todo = require ("../models/Todo");

const router = express.Router();

router.post("/todos", async (req, res)=>{
    const todoData = req.body;
    try {
    const todo = new Todo(todoData);
    await todo.save();
    return res.status(201).send(todo);
    } catch(error){
        res.status(400).send(error);
    } 

});
router.get("/todos", (req, res) => {
    Todo.find({})
    .then((todos) => {
        return res.status(200).send(todos);
    })
    .catch((error) =>{
     return res.status(400).send(error);
    });
});
//fetching a single todo
router.get ("./todos/:id",  async (req,res)=>{
    const id = req.params.id;
try{
const todo = await Todo.findById(id);
if(!todo){
    return res.status(404).send({error: "Todo not found"});
}
res.status(200).send (todo);
}
catch (error){
res.status(400).send(error);
}
});

//updating asingle todo
router.patch("/todo/:id", async (req, res)=>{
    let { isCompleted, text} = req.body;
    let {id} = req.params;
    try{
const todo = await Todo.findById(id);
if(!todo){
    return res.status(404).send({error:"This todo item was not found"});
}
todo.isCompleted = isCompleted;
todo.text =text;
await todo.save();
res.status(400).send(todo);
    } catch(error) {
res.status(400).send(error);
    }
});

//deleting a todo
router.delete("/todos/:id", async (req, res)=>{
const{id} = req.params;
try{
const response = await Todo.findByIdAndDelete(id);
res
.status(200)
.send({message:"item deleted succesfully!", data:response});
}catch (error){
res.status(400).send(error);
}
});

module.exports = router;