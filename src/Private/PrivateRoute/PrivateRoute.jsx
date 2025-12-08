import useAuth from '../../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = () => {
    const {user,loading}= useAuth()
    const location = useLocation()
    if(loading){
        return 
    }
    if(!user){
        return <Navigate state={location.pathname} to='/login'></Navigate>
    }
    return (
        <div>
            
        </div>
    );
};

export default PrivateRoute;