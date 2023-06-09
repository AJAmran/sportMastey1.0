import { createBrowserRouter } from "react-router-dom";
import Home from "../../pages/home/Home";
import Main from "../../Layout/Main";
import Login from "../../pages/login/Login";
import Instructors from "../../pages/instructiors/Instructors";
import RegistrationPage from "../../pages/registration/Registration";
import Dashboard from "../../Layout/DashBoard";
import Manageusers from "../../pages/ManageUser/Manageusers";
import PrivateRoute from "../privateRoute/PrivateRoute";
import AddCalsses from "../../pages/addClasses/AddCalsses";
import ManageClasses from "../../pages/manageClasses/ManageClasses";
import Classes from "../../pages/classes/Classes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/instructors",
        element: <Instructors></Instructors>,
      },
      {
        path: '/classes',
        element: <Classes></Classes>
      }
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/registration",
    element: <RegistrationPage></RegistrationPage>
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children:[
      {
        path: 'manageUsers',
        element:<Manageusers></Manageusers>
      },
      {
        path: 'addClass',
        element: <AddCalsses></AddCalsses>
      },
      {
        path: 'manageClasses',
        element: <ManageClasses></ManageClasses>
      },
      {
        path: 'selectedClass',
      
      }
    ]
  }
]);

export default router;
