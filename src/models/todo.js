import {Schema, model} from "mongoose";

const Todo = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
});

export default model('Todo', Todo);