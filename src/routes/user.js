const { Router } = require('express');
const authToken = require('../middlewares/authtoken');
const authAdmin = require('../middlewares/authadmin');
const { loginUser, signUp, getUserById, updateUserById, getAllUsers, deleteUser } = require('../models/user');

const UserRouter = Router();


/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Users]
 *     description: Login user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         required: true
 *         type: string     
 *          
 *     responses:
 *       200:
 *         description: Success
 */

//login user
UserRouter.post('/login', loginUser);



/**
 * @swagger
 * /signup:
 *   post:
 *     tags: [Users]
 *     description: Signup user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 */

//signup user
UserRouter.post('/signup', signUp)

/**
 * @swagger
 * /user/:id:
 *   get:
 *     tags: [Users]
 *     description: Get user by id
 *     produces:
 *       - appliciation/json
 *     parameters:
 *       - in: path
 *         name: userId
 *     responses:
 *       200:
 *         description: Success
 */

//get user by id
UserRouter.get('/user/:id', authToken, getUserById)

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Success
 */

//get all users with pagination
UserRouter.get('/users', getAllUsers)

/**
 * @swagger
 * /user/:id:
 *   put:
 *     tags: [Users]
 *     description: Update user by id
 *     responses:
 *       200:
 *         description: Success
 */

//update user by id
UserRouter.put('/user/:id', authToken, updateUserById);

/**
 * @swagger
 * /user/:id:
 *   delete:
 *     tags: [Users]
 *     description: Delete user by id
 *     responses:
 *       200:
 *         description: Success
 */

//delete user
UserRouter.delete('/user/:id', [authToken, authAdmin], deleteUser)


module.exports = UserRouter;