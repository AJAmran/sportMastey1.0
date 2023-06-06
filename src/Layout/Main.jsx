import { Outlet } from "react-router-dom";
import Navbar from "../Components/shared/header/Navbar";
import Footer from "../Components/shared/footer/Footer";
const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;