import axios from "axios";
// import { data } from "react-router-dom";

const userData = localStorage.getItem("todo-user");
let usertoken = null;

if (userData) {
  try {
    usertoken = JSON.parse(userData);

    if (usertoken && usertoken.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${usertoken.token}`;
    }
  } catch (err) {
    console.error("Invalid token format in localStorage", err);
  }
}

export const createtodos = async (data) => {
  return axios.post("https://mern-stack-taskflow.onrender.com/api/todo/createtodo", data);
};
export const getallTodo=(id,token)=>{
   return axios.post(`https://mern-stack-taskflow.onrender.com/api/todo/getallTodo/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export const updateTodos=(id,data)=>{
return axios.patch("https://mern-stack-taskflow.onrender.com/api/todo/updateTodo/"+id,data)
}
export const deletetodos=(id)=>{
return axios.delete("https://mern-stack-taskflow.onrender.com/api/todo/deletdTodo/"+id)
}
