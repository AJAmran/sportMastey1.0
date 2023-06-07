import { createBrowserRouter } from "react-router-dom";
import Home from "../../pages/home/Home";
import Main from "../../Layout/Main";
import Login from "../../pages/login/Login";
import Instructors from "../../pages/instructiors/Instructors";
import RegistrationPage from "../../pages/registration/Registration";

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
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/registration",
    element: <RegistrationPage></RegistrationPage>
  }
]);

export default router;
