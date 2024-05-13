import { useEffect, useState } from "react";
import { getUsers } from "../utils/api-communicator";
import Pagination from "../components/Pagination";
import { Link, useSearchParams } from "react-router-dom";
import { UsersTableSkeleton } from "../components/Skeletons";
import Search from "../components/Search";

const Users = () => {

    const [users, setUsers] = useState<any[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);

    //@ts-ignore
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState<boolean>(false);

    const currentPage = Number(searchParams.get('page')) || 1;
    const searchQuery = searchParams.get('search') || "";

    const handleGetUsers = async () => {
        setLoading(true);
        const data = await getUsers(currentPage,searchQuery);
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
    }, [currentPage,searchQuery]);
    return (
        <div className="w-full h-screen bg-[#1ABC9C]">
            <div className="flex w-full items-center justify-between px-6 py-3">
                <h1 className="font-lusitana text-2xl">Users</h1>
            </div>
            <nav className="flex max-w-sm px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 mx-auto md:mx-6" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <Link to={"/"} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#22bc1a]">
                            <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                            </svg>
                            Home
                        </Link>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2">Users</span>
                        </div>
                    </li>
                </ol>
            </nav>
            <div className="mt-4 flex items-center justify-between gap-2 px-6 md:mt-8">
                <Search placeholder="Search users..." />
            </div>
            {loading ? (
                <UsersTableSkeleton />
            ) : (
                <div className="mt-2 flow-root p-6">
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