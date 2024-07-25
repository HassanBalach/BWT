import express from 'express';
import { createUser , getAllUsers ,  getAUser, updateUser, deleteUser } from '../controller/user.controller.js';

const route = express.Router()

route.post('/', createUser)

route.get('/', getAllUsers)

route.get('/:id', getAUser)

route.patch('/:id', updateUser)

route.delete('/:id', deleteUser)



export default route