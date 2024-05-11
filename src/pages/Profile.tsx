import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { getUserProfileDetails, updateUserProfile, uploadProfileImage } from "../utils/api-communicator";

const Profile = () => {
    const fileRef = useRef(null);
    //const {currentUser,loading,error} = useSelector((state:IRootState)=>state.user)
    const [image, setImage] = useState<string>("");
    const [userDetails, setUserDetails] = useState<any>({
        name:"",
        dob:"",
        address:"",
        mobileNo:""
    });

    useEffect(() => {
        const getUserDetails = async () => {
            const data = await getUserProfileDetails();
            if (data) {
                setUserDetails(data.userDetails);
                setImage(data.userDetails.profilePicUrl ?? "");
            }
        }

        getUserDetails();
    }, []);

    const uploadProfilePic = async (e: ChangeEvent<HTMLInputElement>) => {
        try {
            if (e.target.files && e.target.files.length > 0) {
                const data = await uploadProfileImage(e.target.files[0]);
                if (data && data.message === "OK") {
                    setImage(data.profilePicUrl);
                }
            }
        } catch (e) {
            console.log(e);
        }

    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserDetails({ ...userDetails, [e.target.id]: e.target.value });
    }

    const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = await updateUserProfile(userDetails);
        if(data){

        }
    }


    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input type="file" ref={fileRef} hidden accept="image/*" onChange={uploadProfilePic} />
                <img src={image} alt="profile picture"
                    className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
                    onClick={() => fileRef.current.click()}
                />
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input defaultValue={userDetails.name} type="text" id="name" name="name" onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" />
                </div>
                <div>
                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700">DOB</label>
                    <input defaultValue={userDetails.dob} type="date" id="dob" name="dob" onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" />
                </div>
                <div>
                    <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-700">MobileNo</label>
                    <input defaultValue={userDetails.mobileNo} type="text" id="mobileNo" name="mobileNo" onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" />
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <input defaultValue={userDetails.address} type="text" id="address" name="address" onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" />
                </div>
                <button type="submit" className="w-full bg-[#22bc1a] text-white p-2 rounded-md hover:bg-blue-800 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">Update</button>
            </form>
        </div>
    );
}

export default Profile;