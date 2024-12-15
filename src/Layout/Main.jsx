import { Outlet } from "react-router-dom";
import Navbar from "../Components/shared/header/Navbar";
import Footer from "../Components/shared/footer/Footer";
const Main = () => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
