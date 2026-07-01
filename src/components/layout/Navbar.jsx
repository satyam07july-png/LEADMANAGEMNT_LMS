import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold text-blue-600">
            IEM CRM
          </h1>
        </div>

        {/* Login */}
        <Link
          to="/login"
          className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Login
        </Link>

      </div>
    </header>
  );
};

export default Navbar;import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold text-blue-600">
            IEM CRM
          </h1>
        </div>

        {/* Login */}
        <Link
          to="/login"
          className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Login
        </Link>

      </div>
    </header>
  );
};

export default Navbar;