import axios from "axios";
import myAppConfig from "../../../config";

const getTodos = async (is_done, page, size) => {
  try {
    const response = await axios.get(
    myAppConfig.api.ENDPOINT + "/api/v1/todos/get-my-todos?is_done=" + is_done + "&page=" + page + "&size=" + size,
    {headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      }})
    
    console.log(response.data);
    return response;
    
  } catch(error) {
    throw new Error(`Bad request`);
  };
}


const deleteToDo = async (id) => {
    try {
      const response = await axios.delete(
      myAppConfig.api.ENDPOINT + "/api/v1/todos/delete-todo?todo_id=" + id,
      {headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        }})
      
    //   console.log(response.data);
      return response;
      
    } catch(error) {
      throw new Error(`Bad request`);
    };
  }

const makeDoneToDo = async (data) => {
    try {
      const response = await axios.put(
      myAppConfig.api.ENDPOINT + "/api/v1/todos/update-todo",
      data,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      
    //   console.log(response.data);
      return response;
      
    } catch(error) {
      throw new Error(`Bad request`);
    };
  }

const DataService = {
    getTodos,
    deleteToDo,
    makeDoneToDo
};

export default DataService;