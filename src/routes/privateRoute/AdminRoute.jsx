import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    const [isAdmin, isAdminLoading] = useAdmin()

    if (loading || isAdminLoading){
        return <span className="loading loading-bars loading-lg"></span>
    }
    if(user && isAdmin){
        return children;
    }

    return (
       <Navigate to='/login' state={{from: location }}replace></Navigate>
    );
};

export default PrivateRoute;