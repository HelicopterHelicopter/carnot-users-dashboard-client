import { UserGroupIcon } from "@heroicons/react/24/outline";

const iconMap = {
    customers:UserGroupIcon
}

const CardWrapper = ({noOfUsers,noOfActiveUsers,noOfCompleteUsers}:{noOfUsers:number,noOfActiveUsers:number,noOfCompleteUsers:number}) => {

    return(
        <>
        <Card title="Total Users" value={noOfUsers} icon="customers"/>
        <Card title="Active Users" value={noOfActiveUsers} icon="customers"/>
        <Card title="Users With Completed Profiles" value={noOfCompleteUsers} icon="customers"/>
        </>
    );
    
}

const Card = ({title,value,icon}:{title:string,value:number|string,icon:string}) => {
    const Icon = iconMap[icon];
    return(
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
            <div className="flex p-4">
                {Icon ? <Icon className="h-5 w-5 text-gray-700"/>:null}
                <h3 className="ml-2 text-sm font-medium">{title}</h3>
            </div>
            <p className="font-lusitana truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
                {value}
            </p>
        </div>
    );
}

export default CardWrapper;