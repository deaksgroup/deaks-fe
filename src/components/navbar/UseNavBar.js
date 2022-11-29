import axios from "axios";

// Logout
export const Logout = async () =>{
    const data =await axios.get('/logout');
    return data?.data;
    }