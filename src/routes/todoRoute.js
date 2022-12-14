import Router from 'express';
import todoController from '../controllers/todoControllers.js';
import { validateToken } from '../middlewares/authMiddleware.js'
import { todoValidation } from '../utils/validations.js';
import { handleValidationErrors } from '../utils/handleValidationErrors.js';

const todoRoute = new Router()
/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - title
 *         - userId
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the todo
 *         title:
 *           type: string
 *           description: The todo title
 *         description:
 *           type: string
 *           description: The todo description
 *         userId:
 *           type: string
 *           description: Id of the user who created the todo
 *       example:
 *         title: title
 *         description: description
 *
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TodoResponse:
 *       type: object
 *       required:
 *         - title
 *         - userId
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the todo
 *         title:
 *           type: string
 *           description: The todo title
 *         description:
 *           type: string
 *           description: The todo description
 *         userId:
 *           type: string
 *           description: Id of the user who created the todo
 *       example:
 *         _id: 63845aebb12a3125ef18d3c2
 *         title: title
 *         description: description
 *         userId: 637fe2453defe5b1823db46c
 *
 *
 */

/**
 * @swagger
 * tags:
 *   name: Todo
 *   description: The todos managing API
 */

/**
 * @swagger
 * /todo:
 *   post:
 *     summary: Create a new todo
 *     security:
 *     - bearerAuth: []
 *     tags: [Todo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: The todo was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoResponse'
 *       500:
 *         description: Some server error
 */
todoRoute.post( '/', todoValidation, handleValidationErrors, validateToken, todoController.create)

/**
 * @swagger
 * /todo:
 *   get:
 *     summary: Returns the list of your todo
 *     security:
 *     - bearerAuth: []
 *     tags: [Todo]
 *     responses:
 *       200:
 *         description: The list of the todo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TodoResponse'
 */
todoRoute.get('/', validateToken, todoController.getAll)

/**
 * @swagger
 * /todo/{id}:
 *   get:
 *     summary: Get your todo by id
 *     security:
 *     - bearerAuth: []
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The todo id
 *     responses:
 *       200:
 *         description: The todo by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoResponse'
 *       404:
 *         description: The todo was not found
 */
todoRoute.get('/:id', validateToken,  todoController.getOne)

/**
 * @swagger
 * /todo/{id}:
 *  patch:
 *    summary: Update your todo by the id
 *    security:
 *    - bearerAuth: []
 *    tags: [Todo]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The todo id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Todo'
 *    responses:
 *      200:
 *        description: The todo was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TodoResponse'
 *      404:
 *        description: The todo was not found
 *      500:
 *        description: Some error happened
 */
todoRoute.patch('/:id', todoValidation, handleValidationErrors, validateToken, todoController.update)

/**
 * @swagger
 * /todo/{id}:
 *   delete:
 *     summary: Remove your todo by id
 *     security:
 *     - bearerAuth: []
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The todo id
 *     responses:
 *       200:
 *         description: The todo was deleted
 *       404:
 *         description: The todo was not found
 */
todoRoute.delete('/:id', validateToken, todoController.remove)

export default todoRoute;