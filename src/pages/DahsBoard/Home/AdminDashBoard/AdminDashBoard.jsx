import AdminHome from "../AdminHome/AdminHome";
import AdminLatestIssues from "../AdminLatestIssues/AdminLatestIssues";
import AdminLatestRegister from "../AdminLatestRegister/AdminLatestRegister";

const AdminDashBoard = () => {
    return (
        <div>
            <AdminHome/>
            <AdminLatestIssues/>
            <AdminLatestRegister/>
        </div>
    );
};

export default AdminDashBoard;