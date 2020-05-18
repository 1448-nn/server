const express = require("express");
const cors = require("cors");
const db = require('./db/db');
const todosview = require('./views/todosview');
const userView = require ('./views/userView');


const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(todosview);
app.use(userView);


app.get("/", (req, res) => {
    res.status(200).send({message: "welcome to our REST API."});
});

app.listen(port, () =>{
    console.log(`server is running on port ${port}`);
    
});