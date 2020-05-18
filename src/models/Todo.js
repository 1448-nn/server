const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true,
    },
    isCompleted:{
        type: Boolean,
        required: true,
        default: false
    }
});
 const Todo = mongoose.model("Todo", TodoSchema);
 module.exports = Todo;