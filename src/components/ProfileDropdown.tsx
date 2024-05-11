import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IRootState } from "../redux/store";
import { logout } from "../utils/api-communicator";
import { signOut } from "../redux/user/userSlice";

const ProfileDropdown = () => {

    const {currentUser} = useSelector((state:IRootState)=>state.user);
    const [isOpen, setIsOpen] = useState(false);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        const data =  await logout();

        if(data){
            dispatch(signOut());
            navigate("/login");
        }
    };
    
    return (
        <div className="hidden lg:block lg:justify-end relative">
            <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
                <img src={currentUser.profilePic??""} alt="Profile" className="w-8 h-8 rounded-full mr-2" />
                <span className="text-gray-800 font-medium">{currentUser.username}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-4 h-4 ml-1 ${isOpen ? 'transform rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>
            {isOpen && (
                <ul className="absolute right-0 mt-2 bg-white rounded shadow-lg">
                    <Link to={"/profile"}><li className="py-2 px-4 hover:bg-gray-100 cursor-pointer" onClick={toggleDropdown}>My Profile</li></Link>
                    <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
                        Logout
                    </li>
                </ul>
            )}
        </div>
    );
}

export default ProfileDropdown;