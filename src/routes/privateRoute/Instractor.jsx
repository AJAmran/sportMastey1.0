import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import useInstructor from '../../hooks/useInstractor';

const InstructorRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    const [isInstructor, isInstructorLoading] = useInstructor()

    if (loading || isInstructorLoading){
        return <span className="loading loading-bars loading-lg"></span>
    }
    if(user && isInstructor){
        return children;
    }

    return (
       <Navigate to='/login' state={{from: location }}replace></Navigate>
    );
};

export default InstructorRoute;