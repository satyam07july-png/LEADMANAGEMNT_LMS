import logo from "../../assets/logo/logo.png";
import LoginForm from "./LoginForm";

const LoginCard = () => {
  return (
    <div className="relative z-20 w-full max-w-2xl px-6">

      <div className="rounded-[36px] border border-slate-200/70 bg-white/95 backdrop-blur-xl shadow-[0_30px_80px_rgba(15,23,42,0.15)] p-14">

        {/* Logo */}

        <div className="flex justify-center">

          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-white to-slate-100 shadow-lg">

            <img
              src={logo}
              alt="IEM LMS"
              className="h-12 w-12 object-contain"
            />

          </div>

        </div>

        {/* Heading */}

        <div className="mt-8 text-center">

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-800">

            Welcome Back

          </h1>

          <p className="mt-4 text-xl leading-9 text-slate-500">

            Sign in to access the

            <span className="font-semibold text-blue-600">

              {" "}IEM Crm Portal

            </span>

          </p>

        </div>

        {/* Form */}

        <div className="mt-12">

          <LoginForm />

        </div>

      </div>

    </div>
  );
};

export default LoginCard;