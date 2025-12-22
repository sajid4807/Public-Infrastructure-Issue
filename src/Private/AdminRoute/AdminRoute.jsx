import Forbidden from "../../components/Forbidden/Forbidden";
import Loading from "../../components/Loading/Loading";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";


const AdminRoute = ({children}) => {
    const{loading} =useAuth()
    const{role,roleLoading}=useRole()

    if(roleLoading || loading){return <Loading/>}
    if(role !== 'admin'){
        return <Forbidden/>
    }
    return children;
};

export default AdminRoute;