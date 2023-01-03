import axios from "axios";

const uploadApi = axios.create({
    baseURL : "http://localhost:1337/api"
})




export const uploadImage = async (files) => {
    
    
    
    
    
    return await uploadApi.post("/upload",files)
}


