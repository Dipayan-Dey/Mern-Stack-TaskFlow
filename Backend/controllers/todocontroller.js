import { TodoDB } from "../models/todoModel.js"

export const createTodo=async (req,res)=>{
 try {
  const {title,description,createdBy}=req.body
  
  if(! title || !description){
    res.status(401).json({msg:"All Fileds Are Required...."})
    // res.status(401).json({msg:"All Fileds Are Required...."})
  }
  const todo=await new TodoDB({title,description,createdBy})
  
  todo.save()
  res.status(201).json({msg:"Successfully created..."})


 } catch (error) {
  console.log(error)
 }
}

// data get based on user
// export const getAllTodo=async (req,res)=>{
//   try {
//     const {id}=req.params

//     if(!id){
//       res.status(401).json({msg:"user not found"})
//     }
//     const findedTodos=await TodoDB.find({createdBy:id})
    
//     if(!findedTodos){
//       res.status(401).json({msg:"data not found"})

//     }

//    res.status(201).send({
//      msg:"data fetched successfully",
//      findedTodos
//    })

//   } catch (error) {
//     console.log(error)
//   }
// }

export const getAllTodo = async (req, res) => {
  try {
    //get user id
    const { UserId } = req.params;
    //validate
    if (!UserId) {
      return res.status(404).send({
        success: false,
        message: "No User Found with this id",
      });
    }
    //find task
    const todos = await TodoDB.find({ createdBy: UserId });
    if (!todos) {
      return res.status(404).send({
        success: true,
        message: "you have no todos ",
      });
    }
    res.status(200).send({
      success: true,
      message: "Your Todos",
      todos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get Todo API",
      error,
    });
  }
};




export const deleteTodo=async (req,res)=>{
  try {
    const {id}=req.params

    if(!id){
      res.status(401).json({msg:"data not found"})
    }
    const findedTodos=await TodoDB.findByIdAndDelete({_id:id})
    
    if(!findedTodos){
      res.status(401).json({msg:"data not found"})

    }

   res.status(201).send({
     msg:"data deleted successfully",
     findedTodos
   })

  } catch (error) {
    console.log(error)
  }
}
export const updateTodo=async (req,res)=>{
  try {
    const {id}=req.params

    if(!id){
      res.status(401).json({msg:"data not found"})
    }
    const data=req.body
    const updatetodo=await TodoDB.findByIdAndUpdate(id,{$set:data},{returnOriginal:false})
    
    if(!updatetodo){
      res.status(401).json({msg:"data not found"})

    }

   res.status(201).send({
     msg:"data deleted successfully",
     updatetodo
   })

  } catch (error) {
    console.log(error)
  }
}