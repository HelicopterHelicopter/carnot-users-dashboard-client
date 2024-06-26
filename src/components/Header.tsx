import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/carnotLogo.png";
import { useState } from "react";
import { Bars3Icon, PowerIcon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import ProfileDropdown from "./ProfileDropdown";
import { logout } from "../utils/api-communicator";
import { signOut } from "../redux/user/userSlice";

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean | undefined>(false);

    const { currentUser } = useSelector((state: IRootState) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const data =  await logout();

        if(data){
            dispatch(signOut());
            setMobileMenuOpen(false);
            navigate("/login");
        }
    };

    return (
        <header className="bg-white">
            <nav className="mx-auto flex items-center justify-between p-6 lg:px-8" aria-label="global">
                <div className="flex lg:flex-1 ">
                    <Link to="/" className="-m-1.5 p-1.5 border-r-2 border-gray-500">
                        <span className="sr-only">Carnot Research</span>
                        <img className="h-12 w-auto" src={logo} alt="carnot research" />
                    </Link>
                </div>
                
                <div className="flex lg:hidden">
                    <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}>
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                {currentUser ? (
                    <ProfileDropdown/>
                ) : (<div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
                    <Link to={"/login"} className="text-sm py-2 font-semibold leading-6 text-gray-900">
                        Log in
                    </Link>
                    <Link to={"/sign-up"} className="rounded-lg bg-[#22bc1a] px-6 py-2 text-sm font-semibold leading-6 text-gray-900">
                        Sign up
                    </Link>
                </div>)}

            </nav>
            <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10">
                    <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <Link to="/">
                                <span className="sr-only">Carnot Research</span>
                                <img className="h-8 w-auto" src={logo} alt="carnot reasearch" />
                            </Link>
                            <button className="-m-2.5 rounded-md p-2.5 text-gray-700" type="button" onClick={() => setMobileMenuOpen(false)}>
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        {currentUser ? (
                            <div className="py-6">
                            <Link to={"/profile"} onClick={()=>setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                <UserIcon className="w-4"/>My Profile
                            </Link>
                            <div onClick={handleLogout} className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                <PowerIcon className="w-4"/> Sign Out
                            </div>
                        </div>
                        ) : (<div className="py-6">
                            <Link to={"/login"} className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                Log in
                            </Link>
                        </div>)}

                    </DialogPanel>
                </div>
            </Dialog>
        </header>
    );
}

export default Header;