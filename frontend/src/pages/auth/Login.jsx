import LoginBanner from "../../components/auth/LoginBanner";
import LoginCard from "../../components/auth/LoginCard";

const Login = () => {
  return (
    <main className="h-screen w-screen overflow-hidden">

      <div className="grid h-full w-full lg:grid-cols-[52%_48%]">

        {/* Left */}

        <LoginBanner />

        {/* Right */}

        <section className="relative flex h-full items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">

  <div className="absolute -top-32 -right-20 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl" />

  <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-indigo-100/60 blur-3xl" />

  <div className="absolute top-12 right-12 h-24 w-24 rounded-full border border-slate-200 bg-white/50 backdrop-blur-md" />

  <LoginCard />

</section>

      </div>

    </main>
  );
};

export default Login;