import mongoose from "mongoose"
// import { type } from './../../FrontEnd/node_modules/lightningcss/node/index.d';

const todoSchema=new mongoose.Schema({
    title:{
      type:String,
      required:true
    },
    description:{
      type:String,
      required:true
    },
    isComplete:{
      type:Boolean,
      required:true,
      default:false
    },
    createdBy:{
      ref:"ToDoUser",
      type:mongoose.Schema.ObjectId
    }
},{timestamps:true})

const TodoDB=mongoose.model("todo-data",todoSchema)

export {TodoDB}