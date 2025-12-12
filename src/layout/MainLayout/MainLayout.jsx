import { Outlet } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const MainLayout = () => {
    return (
        <div >
            <Navbar/>
            <div className="body-width px-4">
                <Outlet></Outlet>
            </div>
            <Footer/>
        </div>
    );
};

export default MainLayout;