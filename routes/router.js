import express from 'express';
import { viewHome, viewAll, viewAddUser, addNewUser, viewEditUser, viewDeleteUser, editUser, deleteUser } from '../controller/controller.js';
const router = express.Router();

//Home route
router.get('/', viewHome);

//Route for viewing all users in db
router.get('/viewUsers', viewAll);

router.get('/addUser', viewAddUser);

router.post('/addUser', addNewUser);

router.get('/editUser', viewEditUser);

router.post('/editUser', editUser);

router.get('/deleteUser', viewDeleteUser);

router.post('/deleteUser', deleteUser);

export { router };