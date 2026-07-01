import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left */}

        <div>

          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            Lead Management CRM
          </span>

          <h1 className="mt-6 text-5xl font-bold text-slate-900 leading-tight">
            Manage Student Leads
            <br />
            Increase Admissions
          </h1>

          <p className="mt-6 text-lg text-slate-600 leading-8">
            A modern CRM designed for coaching institutes to manage
            leads, assign counsellors and track admissions from one place.
          </p>

          <div className="mt-10">

            <Link
              to="/login"
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition"
            >
              Access Workspace
              <FaArrowRight />
            </Link>

          </div>

        </div>

        {/* Right */}

        <div>

          <div className="bg-white rounded-3xl shadow-2xl p-8">

            <div className="grid grid-cols-2 gap-5">

              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-3xl font-bold text-blue-600">
                  1250+
                </h3>

                <p className="mt-2 text-gray-600">
                  Total Leads
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-3xl font-bold text-green-600">
                  310
                </h3>

                <p className="mt-2 text-gray-600">
                  Admissions
                </p>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6">
                <h3 className="text-3xl font-bold text-yellow-600">
                  42
                </h3>

                <p className="mt-2 text-gray-600">
                  Counsellors
                </p>
              </div>

              <div className="bg-purple-50 rounded-xl p-6">
                <h3 className="text-3xl font-bold text-purple-600">
                  96%
                </h3>

                <p className="mt-2 text-gray-600">
                  Success Rate
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;