import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";

const StudentHome = () => {
    const {user} = useContext(AuthContext)

    console.log(user)
    return (
        <div className="ml-64">
            <h2 className="text-center text-2xl font-bold"> Hello! {user?.displayName} <br />welcome to your control panel..</h2>
        </div>
    );
};

export default StudentHome;