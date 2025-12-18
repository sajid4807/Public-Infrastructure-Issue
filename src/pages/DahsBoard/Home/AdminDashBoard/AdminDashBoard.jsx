import AdminHome from "../AdminHome/AdminHome";
import AdminLatestIssues from "../AdminLatestIssues/AdminLatestIssues";

const AdminDashBoard = () => {
    return (
        <div>
            <AdminHome/>
            <AdminLatestIssues/>
        </div>
    );
};

export default AdminDashBoard;