import axios from "axios";

export const signUp = async (username:string,email:string,password:string) => {

    const res = await axios.post("/auth/signup",{userName:username,email,password});
    if(res.status!==201){
        throw new Error("Unable to singup");
    }

    const data = await res.data;
    return data;
}

export const loginUser = async (username:string,password:string) => {
    const res = await axios.post("/auth/login",{userName:username,password});
    if(res.status!==200){
        throw new Error("Unable to login");
    }

    const data = await res.data;
    return data;
}