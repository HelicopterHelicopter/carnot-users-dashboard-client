import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { ArrowRightIcon, EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { getDateString } from "../utils/dateUtil";
import { Link } from "react-router-dom";

const HomeProfile = () => {
    const { currentUser } = useSelector((state: IRootState) => state.user);
    return (
        <div className="rounded-xl bg-gray-50 p-4">
            <div className="sm:grid-cols-13 mt-0 grid items-end gap-2 rounded-md bg-white p-4 md:gap-4">
                <img src={currentUser.profilePic} alt="profile picture"
                    className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2 mx-auto"
                />
                <h2 className="self-center mx-auto font-lusitana">{currentUser.username}</h2>
                <div className="rounded-xl bg-gray-50 p-4 grid grid-cols-2">
                    <div>
                        <h2>Name:{currentUser.name ?? "  NA"}</h2>
                    </div>
                    <div>
                        <h2>Gender:{currentUser.gender ?? "  NA"}</h2>
                    </div>
                    <div>
                        <h2>DOB:{currentUser.dob ? getDateString(new Date(currentUser.dob)) : "  NA"}</h2>
                    </div>
                    <div>
                        <h2 className="flex"><PhoneIcon className="w-4" />:{currentUser.mobileNo ?? "  NA"}</h2>
                    </div>
                    <div>
                        <h2 className="flex">Address <MapPinIcon className="w-4" />: {currentUser.address ?? "  NA"}</h2>
                    </div>
                    <div>
                        <h2 className="flex"><EnvelopeIcon className="w-4" />:{currentUser.email ?? " NA"}</h2>
                    </div>
                </div>
                <Link
                    to="/profile"
                    className="flex w-1/4 items-center mx-auto gap-5 self-start rounded-lg bg-[#22bc1a] px-2 py-3 text-sm font-medium text-white transition-colors hover:bg-[#79cf73] md:text-base"
                >
                    <span>Update</span> <ArrowRightIcon className="w-5 md:w-6" />
                </Link>
            </div>
        </div>
    );
}

export default HomeProfile;