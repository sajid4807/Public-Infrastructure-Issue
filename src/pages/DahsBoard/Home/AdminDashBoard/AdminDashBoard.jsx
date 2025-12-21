import AdminHome from "../AdminHome/AdminHome";
import AdminLatestIssues from "../AdminLatestIssues/AdminLatestIssues";
import AdminLatestPayment from "../AdminLatestPayment/AdminLatestPayment";
import AdminLatestRegister from "../AdminLatestRegister/AdminLatestRegister";

const AdminDashBoard = () => {
    return (
        <div>
            <AdminHome/>
            <AdminLatestIssues/>
            <AdminLatestRegister/>
            <AdminLatestPayment/>
        </div>
    );
};

export default AdminDashBoard;