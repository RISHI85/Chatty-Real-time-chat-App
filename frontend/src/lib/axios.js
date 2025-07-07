import axios from "axios";
export const axiosInstance = axios.create({
    baseURL : "https://chatty-real-time-chat-app-028i.onrender.com",
    withCredentials:true,
})