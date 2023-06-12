import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";

const InstructorHome = () => {
    const {user} = useContext(AuthContext)

    console.log(user)
    return (
        <div className="ml-64">
            <h2 className="text-center text-2xl font-bold"> Hello! {user?.displayName} <br /> welcome to you Control Panel...</h2>
        </div>
    );
};

export default InstructorHome;