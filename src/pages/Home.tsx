import React, { useEffect, useState } from "react";
import { getHomePageInsights } from "../utils/api-communicator";
import CardWrapper from "../components/CardWrapper";
import { CardsSkeleton } from "../components/Skeletons";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const Home = () => {

    const [insights, setInsights] = useState({ totalUsers: 0, activeUsers: 0, profileCompletedUsers: 0 });
    const [insightsLoading, setInsightsLoading] = useState<boolean>(false);
    const { currentUser } = useSelector((state: IRootState) => state.user);

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                setInsightsLoading(true);
                const data = await getHomePageInsights();
                if (data && data.message === "OK") {
                    setInsights(data.insights);
                }
                setInsightsLoading(false);
            } catch (e) {
                console.log(e);
            }

        }
        fetchInsights();
    }, []);
    return (
        <main className="bg-[#1ABC9C] h-screen p-6">
            <h1 className="font-lusitana mb-4 text-xl md:text-2xl">Home</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {insightsLoading ? (
                    <CardsSkeleton />
                ) : (
                    <CardWrapper noOfActiveUsers={insights.activeUsers} noOfCompleteUsers={insights.profileCompletedUsers} noOfUsers={insights.totalUsers} />
                )}
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <div className="w-full md:col-span-4">
                    <h2 className="font-lusitana mb-4 text-xl md:text-2xl">Hello {currentUser.username}!</h2>
                    <div className="rounded-xl bg-gray-50 p-4">
                        <div className="sm:grid-cols-13 mt-0 grid items-end gap-2 rounded-md bg-white p-4 md:gap-4">
                            <h4 className="font-lusitana">Welcome to Carnot Research Users Dashboard.</h4>
                            <h4 className="font-lusitana">Here's a quick overview of what you can do:</h4>
                            <h4 className="font-lusitana">1. View Details about all the users registered on the platform</h4>
                            <h4 className="font-lusitana">2. Get Insights and user metrics</h4>
                            <h4 className="font-lusitana">3. Update your user profile</h4>
                            <Link
                                to="/users"
                                className="flex w-1/4 items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
                            >
                                <span>View Users</span> <ArrowRightIcon className="w-5 md:w-6" />
                            </Link>
                        </div>

                    </div>

                </div>
            </div>
        </main>
    );
}

export default Home;