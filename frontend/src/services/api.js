import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=10';

export const getTodo = () =>{
    const response = axios.get(API_URL);
    console.log("🚀 ~ getTasksAPI ~ response:", response)
    return response;
} 
    