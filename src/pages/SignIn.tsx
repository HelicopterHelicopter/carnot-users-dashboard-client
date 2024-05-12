import React, { ChangeEvent, FormEvent, useState } from "react";
import login from '../assets/login.jpg';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";
import { googleSignin, loginUser } from "../utils/api-communicator";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

const SignIn = () => {
    const [formData,setFormData] = useState<any>({});
    const {loading,error} = useSelector((state:IRootState)=>state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e:ChangeEvent<HTMLInputElement>)=> {
        setFormData({
            ...formData,[e.target.id]:e.target.value
        });
    }

    const handleSubmit = async (e:FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        
        try{
            toast.loading("Signing In ",{id:"login"});
            dispatch(signInStart());
            const data = await loginUser(formData.username,formData.password);
            if(data){
                dispatch(signInSuccess(data.userDetails));
                navigate("/");
                toast.success("Signed In Successfully",{id:"login"})
            }
        }catch(e){
            signInFailure(e);
            toast.error("Error in Signing In",{id:"login"});
        }
    }

    const googleSignInSuccess = async (response) => {
        try{
            console.log(response);
            dispatch(signInStart());
            const data = await googleSignin(response.access_token);
            console.log(data);
            if(data && data.message==="OK"){
                dispatch(signInSuccess(data.userDetails));
                navigate("/");
            }
        }catch(e){
            signInFailure(e);
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: tokenResponse => googleSignInSuccess(tokenResponse)
    })

    return(
        <div className='flex h-screen'>
            <div className='hidden lg:flex items-center justify-center flex-1 bg-white text-black'>
                <img className='h-full w-full' src={login} />

            </div>
            <div className='w-full bg-[#1ABC9C] lg:w-1/2 flex items-center justify-center'>
                <div className='max-w-md w-full p-6'>
                    <h1 className='text-3xl font-semibold mb-6 text-black text-center'>Sign In</h1>
                    <div className='mt-4 flex flex-col lg:flex-row items-center justify-between'>
                        <button onClick={()=>googleLogin()} type='button' className='w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4" id="google">
                                <path fill="#fbbb00" d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"></path>
                                <path fill="#518ef8" d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"></path>
                                <path fill="#28b446" d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"></path>
                                <path fill="#f14336" d="m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"></path>
                            </svg>
                            Sign In with Google
                        </button>
                    </div>
                    <div className='mt-4 text-sm text-gray-600 text-center'>
                        <p>or with username</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            <input type="text" id="username" name="username" onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" id="password" name="password" onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" />
                        </div>
                        <div>
                            <button disabled={loading} type="submit" className="w-full bg-[#22bc1a] text-white p-2 rounded-md hover:bg-blue-800 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">Login</button>
                        </div>
                    </form>
                    <div className="mt-4 text-sm text-gray-600 text-center">
                        <p>Don't have an account? <Link to={"/sign-up"} className='text-black hover:underline'>Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}   

export default SignIn;