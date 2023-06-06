import logo from '../../../assets/logo.png'


const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
