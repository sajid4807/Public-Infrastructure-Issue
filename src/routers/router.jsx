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
import MyReports from "../pages/DahsBoard/MyReports/MyReports";

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
        // loader:()=>fetch(``)
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
        path:'report',
        element:<PrivateRoute><Report/></PrivateRoute>
      }
    ],
  },
  {
    path:'dashboard',
    element:<PrivateRoute><DashBoardLayout/></PrivateRoute>,
    children:[
      {
        path:'my-reports',
        element:<MyReports/>
      },
    ]
  },
]);
