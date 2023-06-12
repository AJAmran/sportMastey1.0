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
import SelectedClass from "../../pages/selectedClass/SelectedClass";
import Payment from "../../pages/Payment/Payment";
import PaymentHistory from "../../pages/Payment/PaymentHistory";
import EnrolledClass from "../../pages/enrolledClass/EnrolledClass";
import InstructorClasses from "../../pages/instructiors/InstructorClasses";
import AdminRoute from "../privateRoute/AdminRoute";
import InstructorProtectedRoute from "../privateRoute/InstructorProtectedRoute";
import StudentProtectedRoute from "../privateRoute/StudentProtectedRoute";
import ErrorPage from "../../Components/ErrorPage/ErrorPage";
import AdminHome from "../../pages/adminHome/AdminHome";
import InstructorHome from "../../pages/instructorHome/InstructorHome";
import StudentHome from "../../pages/studentHome/StudentHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
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
        path: 'adminHome',
        element:<AdminHome></AdminHome>
      },
      {
        path: 'instructorHome',
        element: <InstructorHome></InstructorHome>
      },
      {
        path: 'studentHome',
        element: <StudentHome></StudentHome>
      },
      {
        path: 'manageUsers',
        element: <AdminRoute><Manageusers></Manageusers></AdminRoute>
      },
      {
        path: 'addClass',
        element: <InstructorProtectedRoute><AddCalsses></AddCalsses></InstructorProtectedRoute>
      },
      {
        path: 'manageClasses',
        element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
      },
      {
        path: 'selectedClass',
        element: <StudentProtectedRoute><SelectedClass></SelectedClass></StudentProtectedRoute>
      },
      {
        path: 'payment/:id',
        element: <Payment></Payment>,
      }, 
      {
        path: 'paymentHistory',
        element: <StudentProtectedRoute><PaymentHistory></PaymentHistory></StudentProtectedRoute>
      }, 
      {
        path: 'myEnrolledClass',
        element: <StudentProtectedRoute><EnrolledClass></EnrolledClass></StudentProtectedRoute>
      },
      {
        path: 'myClass',
        element: <InstructorProtectedRoute><InstructorClasses></InstructorClasses></InstructorProtectedRoute>
      }
    ]
  }
]);

export default router;
