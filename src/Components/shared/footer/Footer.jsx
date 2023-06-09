import logo from "../../../assets/logo.png";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex items-center justify-center sm:col-span-2 md:col-span-1">
            <img
              src={logo} // Replace with your logo image source
              alt="Logo"
              className="h-16"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p>Email: info@example.com</p>
            <p>Phone: +1 123-456-7890</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Address</h3>
            <p>123 Baized Road</p>
            <p>Nasirabad, Chittagong, Bangladesh</p>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white mr-4"
              >
                <FaFacebookSquare size={24}></FaFacebookSquare>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white mr-4"
              >
                <FaInstagramSquare size={24}></FaInstagramSquare>
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white mr-4"
              >
                <FaYoutube size={24}></FaYoutube>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-white text-sm">
            &copy; {new Date().getFullYear()} Your Website. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
