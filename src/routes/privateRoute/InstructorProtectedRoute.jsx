import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import useInstructor from "../../hooks/useInstructor";
import { Navigate, useLocation } from "react-router-dom";


const InstructorProtectedRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [isInstructor, isInstructorLoading] = useInstructor();
    const location = useLocation();
    if(loading || isInstructorLoading){
        return <span className="loading loading-bars loading-lg"></span>
    }

    if(user && isInstructor){
        return children;
    }


    return <Navigate to="/" state={{from: location}} replace></Navigate>
};

export default InstructorProtectedRoute;