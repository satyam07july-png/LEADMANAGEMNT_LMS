import logo from "../../assets/logo/logo.png";
import girl from "../../assets/illustrations/girl.png";

import {
  Users,
  Megaphone,
  GraduationCap,
  BookOpen,
} from "lucide-react";

const features = [
  {
    title: "Leads",
    icon: Users,
  },
  {
    title: "Campaigns",
    icon: Megaphone,
  },
  {
    title: "Admissions",
    icon: GraduationCap,
  },
  {
    title: "Learning",
    icon: BookOpen,
  },
];

const LoginBanner = () => {
  return (
    <section className="relative hidden overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 lg:flex flex-col justify-between">

      {/* Blur */}

      <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl" />

      {/* Header */}

      <div className="relative z-20 p-10">

        <div className="flex items-center gap-5">

          <img
            src={logo}
            alt=""
            className="h-16 w-16 rounded-2xl bg-white p-2 shadow-xl"
          />

          <div>

            <h1 className="text-4xl font-bold text-white">

              IEM

            </h1>

            <p className="text-blue-100">

              INSTITUTE OF EVENT MANAGEMENT

            </p>

          </div>

        </div>

     
  <div className="mt-[120px] max-w-xl">

          <h2 className="text-5xl font-black leading-tight text-white">

            One Platform

          </h2>

          <h2 className="text-5xl font-black leading-tight text-cyan-300">

            Modern

          </h2>

          <h2 className="text-5xl font-black leading-tight text-cyan-300">

            Education

          </h2>

          <p className="mt-8 text-xl leading-10 text-blue-100">

            Manage admissions, campaigns,
            leads, students and learning
            from one secure platform.

          </p>

        </div>

      </div>

      {/* Illustration */}

      <img
  src={girl}
  alt="Student"
  className="absolute bottom-10 right-0 z-20 h-[400px] object-contain drop-shadow-2xl"
/>

      {/* Cards */}

      <div className="relative z-20 grid grid-cols-4 gap-5 p-8">

        {features.map((item) => {

          const Icon = item.icon;

          return (

            <div
              key={item.title}
              className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-lg transition hover:bg-white/20"
            >

              <Icon
                size={34}
                className="text-white"
              />

              <h3 className="mt-5 text-xl font-semibold text-white">

                {item.title}

              </h3>

            </div>

          );

        })}

      </div>

    </section>
  );
};

export default LoginBanner;