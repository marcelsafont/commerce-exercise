const { Router } = require('express');
const authToken = require('../middlewares/authtoken');
const authAdmin = require('../middlewares/authadmin');
const { loginUser, signUp, getUserById, updateUserById, getAllUsers, deleteUser } = require('../models/user');

const UserRouter = Router();

/**
* @swagger
* tags:
*   name: Users
*   description: User management and login
*/

/**
* @swagger
* tags:
*   name: Products
*   description: Products management
*/

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Users]
 *     description: Login user
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
 *     description: Get user by id
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
 *     description: Delete user by id
 *     responses:
 *       200:
 *         description: Success
 */

//delete user
UserRouter.delete('/user/:id', [authToken, authAdmin], deleteUser)


module.exports = UserRouter;