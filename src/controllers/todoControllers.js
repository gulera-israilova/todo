import Todo from '../models/todo.js'

class todoController {
    async create (req, res) {
        try {
            const { title, description } = req.body;
            const todo = new Todo({
                title,
                description,
            })
            await todo.save();
            return res.json({
                message: 'Todo successfully saved',
            });
        } catch (e){
            console.log(e);
            res.status(400).json({
                message: 'Todo save error',
            });
        }
    };

    async getAll (req, res) {
        try {
            const todoList = await Todo.find();
            return res.json(todoList);
        } catch (e){
            console.log(e);
            res.status(400).json({
                message: 'Error getting todo list',
            });
        }
    };

    async getOne (req, res) {
        try {
            const todoId = req.params.id;
            const todo = await Todo.findOne({
                _id:todoId,
            });
            if(!todo) {
                return res.status(400).json({
                    message:"There are no todo with this id",
                });
            }
            return res.json(todo);

        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: 'Error getting todo by id',
            });
        }
    };

    async update (req, res) {
        try {
            const todoId = req.params.id;
            const { title, description } = req.body;
            const todo = await Todo.findOne({
                _id:todoId,
            })

            if(!todo) {
                return res.status(400).json({
                    message: 'There are no todo with this id',
                });
            }

            await Todo.findOneAndUpdate(todo, {
                title,
                description,
            });
            return res.json({
                message: 'Todo successfully updated',
            });
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: 'Todo update error',
            });
        }
    };

    async remove (req, res) {
        try {
            const todoId = req.params.id;
            const todo = await Todo.findOne({
                _id:todoId,
            })

            if(!todo) {
                return res.status(400).json({
                    message: 'There are no todo with this id',
                })
            }
            await Todo.findOneAndDelete(todo);
            return res.json({
                message: 'Successfully deleted',
            })
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: 'Todo delete error',
            });
        }
    };
}

export default new todoController()