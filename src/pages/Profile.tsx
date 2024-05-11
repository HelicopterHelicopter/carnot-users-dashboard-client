import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { getUserProfileDetails, updateUserProfile, uploadProfileImage } from "../utils/api-communicator";
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { getDateString } from "../utils/dateUtil";
import toast from "react-hot-toast";

type UserProfile = {
    username: string,
    name: string,
    dob: string,
    gender: string,
    mobileNo: string,
    address: string,
    profilePicUrl: string
}

const Profile = () => {
    const fileRef = useRef(null);
    //const {currentUser,loading,error} = useSelector((state:IRootState)=>state.user)
    const [image, setImage] = useState<string>("");
    const [userDetails, setUserDetails] = useState<UserProfile>({
        name: "",
        dob: null,
        address: "",
        mobileNo: "",
        gender: "",
        profilePicUrl: "",
        username: ""
    });



    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const data = await getUserProfileDetails();
                if (data) {
                    setUserDetails({ ...data.userDetails, dob: getDateString(new Date(data.userDetails.dob)) });
                    setImage(data.userDetails.profilePicUrl ?? "");
                }
            } catch (e) {

            }

        }

        getUserDetails();
    }, []);



    const uploadProfilePic = async (e: ChangeEvent<HTMLInputElement>) => {
        try {
            toast.loading("Uploading profile pic", { id: "upload" });
            if (e.target.files && e.target.files.length > 0) {
                const data = await uploadProfileImage(e.target.files[0]);
                if (data && data.message === "OK") {
                    setImage(data.profilePicUrl);
                    toast.success("Profile picture update successfully", { id: "upload" });
                }
            }
        } catch (e) {
            console.log(e);
            toast.error("Error in uploading profile pic", { id: "upload" });
        }

    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserDetails({ ...userDetails, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            toast.loading("Updating profile",{id:"update"});
            const data = await updateUserProfile(userDetails);
            if (data) {
                toast.success("Profile updated successfully",{id:"update"});
            }

        } catch (e) {
            toast.error("Error in updating profile",{id:"update"});
        }

    }


    const handleGenderListbox = (e) => {
        console.log(e);
        setUserDetails({ ...userDetails, gender: e });
    }


    return (
        <div className="w-full h-screen bg-[#1ABC9C]">
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-5 mx-auto">
                <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input type="file" ref={fileRef} hidden accept="image/*" onChange={uploadProfilePic} />
                    <img src={image} alt="profile picture"
                        className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
                        onClick={() => fileRef.current.click()}
                    />
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input defaultValue={userDetails.name} type="text" id="name" name="name" onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#22bc1a] transition-colors duration-300" />
                    </div>
                    <div>
                        <label htmlFor="dob" className="block text-sm font-medium text-gray-700">DOB</label>
                        <input defaultValue={userDetails.dob ?? ""} type="date" id="dob" name="dob" onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#22bc1a] transition-colors duration-300" />
                    </div>
                    <div>
                        <Listbox value={userDetails.gender} onChange={handleGenderListbox}>
                            <Label className={"block text-sm font-medium leading-6 text-gray-900"}>Gender</Label>
                            <div className="relative mt-2">
                                <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-[#22bc1a] sm:text-sm sm:leading-6">
                                    <span className="flex items-center"><span className="ml-3 block truncate">{userDetails.gender}</span></span>
                                </ListboxButton>
                                <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    <ListboxOption value="MALE">MALE</ListboxOption>
                                    <ListboxOption value="FEMALE">FEMALE</ListboxOption>
                                    <ListboxOption value="Others">Others</ListboxOption>
                                </ListboxOptions>
                            </div>

                        </Listbox>

                    </div>
                    <div>
                        <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-700">MobileNo</label>
                        <input defaultValue={userDetails.mobileNo} type="text" id="mobileNo" name="mobileNo" onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#22bc1a] transition-colors duration-300" />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                        <input defaultValue={userDetails.address} type="text" id="address" name="address" onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#22bc1a] transition-colors duration-300" />
                    </div>
                    <button type="submit" className="w-full bg-[#22bc1a] text-white p-2 rounded-md hover:bg-blue-800 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">Update</button>
                </form>
            </div>

        </div>
    );
}

export default Profile;