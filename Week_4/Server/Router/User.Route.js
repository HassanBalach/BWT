import { Router } from 'express'
import { createUser } from '../Controller/userController'


const route = Router()


route.get('/', createUser)



