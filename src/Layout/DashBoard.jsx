import { Link, Outlet } from "react-router-dom";
import { MdManageHistory } from 'react-icons/md';
import { MdOutlineManageAccounts } from 'react-icons/md';

const Dashboard = () => {
    const role = "admin"
  return (
    <div className="flex h-screen">
      <div className="bg-gray-800 text-white ">
        <nav className="p-4">
          <ul>
            <li className="py-2 px-4">
              <Link to='/dashboard/addClass' className="block text-gray-300 hover:text-white">
               <span className="flex gap-3"><MdManageHistory size={24}></MdManageHistory>Manage Classes</span> 
              </Link>
            </li>
            <li className="py-2 px-4">
            <Link to='/dashboard/manageUsers' className="block text-gray-300 hover:text-white">
               <span className="flex gap-3"><MdOutlineManageAccounts size={24}></MdOutlineManageAccounts>Manage Users</span> 
              </Link>
            </li>
            <li className="py-2 px-4">
              <a href="#" className="block text-gray-300 hover:text-white">
                Reports
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex-1">
        <div className="p-4">
         <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
