import  express  from 'express';
import { createTodo, deleteTodo, getAllTodo, updateTodo } from './../controllers/todocontroller.js';
// import { Authenticate } from '../middleware/Authentication.js';


export const todoRoute=express.Router()


todoRoute.post("/createtodo",createTodo)
todoRoute.post("/getallTodo/:UserId",getAllTodo)
todoRoute.delete("/deletdTodo/:id",deleteTodo)
todoRoute.patch("/updateTodo/:id",updateTodo)