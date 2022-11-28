import Todo from '../models/todo.js'

class todoController {
    async create (req, res) {
        try {
            const { title, description } = req.body;
            const userId = req.userId;
            const todo = new Todo({
                title,
                description,
                userId
            });
            await todo.save();
            return res.json(todo)
        } catch (e){
            console.log(e);
            res.status(400).json({
                message: 'Todo save error',
            });
        }
    };

    async getAll (req, res) {
        try {
            const todoList = await Todo.find({
                userId: req.userId
            });
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
                userId: req.userId
            });
            if(!todo) {
                return res.status(400).json({
                    message:"There are no todo with this id in your todo",
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
                userId: req.userId
            })

            if(!todo) {
                return res.status(400).json({
                    message: 'There are no todo with this id in your todo',
                });
            }

           const updatedTodo = await Todo.findOneAndUpdate(
                todo,
                {
                    title,
                    description,
                },
                {
                    new: true
                }
                );
            return res.json(updatedTodo);
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
                userId: req.userId,
            })

            if(!todo) {
                return res.status(400).json({
                    message: 'There are no todo with this id in your todo',
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