import axios from "axios";
import Login from "./pages/Login";

const http = axios.create({
 baseURL: "https://api.escuelajs.co/api/v1/auth/",
  headers: {
    "Content-Type": "application/json",
  },
}); 
export default http;



export const loginUser = async (loginData) => {
  const resp = await http.post("login", loginData);
  return resp.data;
};