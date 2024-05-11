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

export const getUsers = async (pageNo:number) => {
    const res = await axios.get("/users",{
        params:{
            pageNo:pageNo
        }
    });
    if(res.status!==200){
        throw new Error("Unable to get users");
    }

    const data = await res.data;
    return data;
}

export const uploadProfileImage = async (file:File) => {
    let formData = new FormData();
    formData.append("profilePic",file);
    const res = await axios.post("/users/upload",formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    });

    if(res.status!==200){
        throw new Error("Unable to upload profile pic");
    }

    const data = await res.data;
    return data;

}

export const getUserProfileDetails = async() => {
    const res = await axios.get("/users/profile");
    if(res.status!==200){
        throw new Error("unable to get profile details");
    }

    const data = await res.data;
    return  data;
}

export const updateUserProfile = async (userDetails:any) => {
    const res = await axios.put("/users/profile",userDetails);
    if(res.status!==200){
        throw new Error("Unable to update user profile");
    }

    const data = await res.data;
    return data;
}

export const logout = async () => {
    const res = await axios.get("/auth/logout");
    if(res.status!==200){
        throw new Error("Error in logging out");
    }

    const data = await res.data;
    return data;
}