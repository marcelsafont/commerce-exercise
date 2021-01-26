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
 * /user/{userId}:
 *   get:
 *     tags: [Users]
 *     description: Get user by id
 *     produces:
 *       - appliciation/json
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         type: string
 *       - name: token
 *         in: header
 *         type: string
 *         required: true
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
 *     parameters:
 *       - name: token
 *         in: header
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 */

//get all users with pagination
UserRouter.get('/users', [authToken, authAdmin],getAllUsers)

/**
 * @swagger
 * /user/{userId}:
 *   put:
 *     tags: [Users]
 *     description: Update user by id
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         type: string
 *       - name: token
 *         in: header
 *         type: string
 *         required: true
 *       - name: name
 *         required: true
 *         in: formData
 *         type: string
 *       - name: email
 *         required: true
 *         in: formData
 *         type: string
 *       - name: role
 *         required: false
 *         in: formData
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 */

//update user by id
UserRouter.put('/user/:id', authToken, updateUserById);

/**
 * @swagger
 * /user/{userId}:
 *   delete:
 *     tags: [Users]
 *     description: Delete user by id
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         type: string
 *       - name: token
 *         in: header
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 */

//delete user
UserRouter.delete('/user/:id', [authToken, authAdmin], deleteUser)


module.exports = UserRouter;