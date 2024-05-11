import { useEffect, useState } from "react";
import { getUsers } from "../utils/api-communicator";
import Pagination from "../components/Pagination";
import { useSearchParams } from "react-router-dom";
import { UsersTableSkeleton } from "../components/Skeletons";

const Users = () => {

    const [users, setUsers] = useState<any[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);

    const [searchParams, setSearchParams] = useSearchParams();
    const [loading,setLoading] = useState<boolean>(false);

    const currentPage = Number(searchParams.get('page')) || 1;

    const handleGetUsers = async () => {
        setLoading(true);
        const data = await getUsers(currentPage);
        if (data.message === "OK") {
            setUsers(data.users);
            setTotalPages(Math.ceil(data.totalCount / 10));
        }

        setLoading(false);
    }

    useEffect(() => {
        handleGetUsers();
    }, []);

    useEffect(() => {
        handleGetUsers();
    }, [currentPage]);
    return (
        <div className="w-full h-screen bg-[#1ABC9C]">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-2xl">Users</h1>
            </div>
            {loading?(
                <UsersTableSkeleton/>
            ):(
                <div className="mt-6 flow-root p-6">
                <div className="inline-block min-w-full align-middle">
                    <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                        <table className="min-w-full text-gray-900">
                            <thead className="rounded-lg text-left text-sm font-normal">
                                <tr>
                                    <th scope="col" className="px-3 py-5 font-medium">Username</th>
                                    <th scope="col" className="px-3 py-5 font-medium">Name</th>
                                    <th scope="col" className="px-3 py-5 font-medium">Gender</th>
                                    <th scope="col" className="px-3 py-5 font-medium">Address</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {users.map((user) => (
                                    <tr key={user.id} className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={user.ProfilePicUrl}
                                                    className="rounded-full"
                                                    width={28}
                                                    height={28}
                                                    alt={`${user.UserName}'s profile picture`}
                                                />
                                                <p>{user.UserName}</p>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3">
                                            {user.Name}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3">
                                            {user.Gender}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3">
                                            {user.Address}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            )}
            
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}

export default Users;