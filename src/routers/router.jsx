import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout/MainLayout";
import Home from "../pages/Home/Home/Home";
import AllIssues from "../pages/AllIssues/AllIssues";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import NotFound from "../components/NotFound/NotFound";
import PrivateRoute from "../Private/PrivateRoute/PrivateRoute";
import Report from "../pages/Report/Report";
import DashBoardLayout from "../layout/DashBoardLayout/DashBoardLayout";
// import MyReports from "../pages/DahsBoard/MyReports/MyReports";
import ReportDetails from "../components/ReportDetails/ReportDetails";
import Edit from "../components/Edit/Edit";
// import AdminHome from "../pages/DahsBoard/Home/AdminHome/AdminHome";
import AdminAllIssues from "../pages/DahsBoard/AdminAllIssues/AdminAllIssues";
import ManageStaff from "../pages/DahsBoard/ManageStaff/ManageStaff";
import AdminDashBoard from "../pages/DahsBoard/Home/AdminDashBoard/AdminDashBoard";
import ManageUsers from "../pages/DahsBoard/ManageUsers/ManageUsers";
// import AdminProfileUpdate from "../pages/DahsBoard/AdminProfile/AdminProfile";
import AdminProfile from "../pages/DahsBoard/AdminProfile/AdminProfile";
import AdminRoute from "../Private/AdminRoute/AdminRoute";
import CitizenHome from "../pages/DahsBoard/CitizenDashBoard/CitizenHome/CitizenHome";
import CitizenMyReport from "../pages/DahsBoard/CitizenDashBoard/CitizenMyReport/CitizenMyReport";
// import CitizenViewIssue from "../pages/DahsBoard/CitizenDashBoard/CitizenViewIssue/CitizenViewIssue";
import ReportIssue from "../pages/DahsBoard/CitizenDashBoard/ReportIssue/ReportIssue";
import CitizenProfile from "../pages/DahsBoard/CitizenDashBoard/CitizenProfile/CitizenProfile";
import Payment from "../pages/DahsBoard/Payment/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement:<NotFound/>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path:'all-issue',
        element:<AllIssues/>,
      },
      {
        path:'login',
        element:<Login/>
      },
      {
        path:'register',
        element:<Register/>
      },
      {
        path:'view-details/:id',
        element:<PrivateRoute><ReportDetails></ReportDetails></PrivateRoute>
      },
      {
        path:'report',
        element:<PrivateRoute><Report/></PrivateRoute>
      },
      {
        path:'edit/:id',
        element:<PrivateRoute><Edit></Edit></PrivateRoute>
      }
    ],
  },
  {
    path:'dashboard',
    element:<PrivateRoute><DashBoardLayout/></PrivateRoute>,
    children:[
      {
        path:'admin-home',
        element:<AdminRoute><AdminDashBoard/></AdminRoute>
      },
      {
        path:'admin-issues',
        element:<AdminRoute><AdminAllIssues/></AdminRoute>
      },
      {
        path:'manage-staff',
        element:<AdminRoute><ManageStaff/></AdminRoute>
      },
      {
        path:'manage-users',
        element:<AdminRoute><ManageUsers/></AdminRoute>
      },
      {
        path:'admin-profile',
        element:<AdminRoute><AdminProfile/></AdminRoute>
      },
      {
        path:'admin-payment',
        element:<AdminRoute><Payment/></AdminRoute>
      },
      {
        path:'citizen-home',
        element:<CitizenHome/>
      },
      {
        path:'citizen-report',
        element:<CitizenMyReport/>
      },
      {
        path:'citizen-report-issue',
        element:<ReportIssue/>
      },
      {
        path:'citizen-profile',
        element:<CitizenProfile/>
      }
      // discuss later ke citizen dashboard na ke general dashboard korvo and this citizen view issue page remove kora lagba
      // {
      //   path:'citizen-view-issue/:id',
      //   element:<CitizenViewIssue/>
      // }
    ]
  },
]);
