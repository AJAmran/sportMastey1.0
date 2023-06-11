import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import useStudent from "../../hooks/useStudent";
import { Navigate, useLocation } from "react-router-dom";


const StudentProtectedRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [isStudent, isStudentLoading] = useStudent();
    const location = useLocation();
    if(loading || isStudentLoading){
        return <span className="loading loading-bars loading-lg"></span>
    }

    if(user && isStudent){
        return children;
    }


    return <Navigate to="/" state={{from: location}} replace></Navigate>
    
    
    
};

export default StudentProtectedRoute;