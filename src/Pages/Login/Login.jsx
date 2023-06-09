import { Helmet } from "react-helmet-async";
import SectionTItle from "../../Components/Shared/SectionTitle/SectionTItle";
import loginLogo from "../../assets/login/loginLogo.png";
import Container from "../../Components/Shared/Container/Container";
import loginImage from "../../assets/login/login.png";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Helmet>
        <title>Harmony Hill | Login</title>
      </Helmet>
      <Container>
        <div className="flex justify-center items-center gap-2">
          <img src={loginLogo} alt="loginLogo" height="40" width="40" />
          <h2>
            <SectionTItle heading="Login Now !"></SectionTItle>
          </h2>
        </div>

        <div className="flex justify-center items-center flex-wrap">
          <img src={loginImage} className="w-1/2" alt="loginImage" />

          <div className="flex justify-center">
            <form className="flex-grow space-y-3 bg-sky-400 w-4/5 rounded-md p-5">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-lg font-semibold "
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border  rounded-md w-full px-3 py-2 border-sky-300 focus:outline-0  "
                  placeholder="Enter Your Email Here "
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-lg font-semibold  "
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className="border  rounded-md  w-full px-3 py-2 outline-0 "
                  placeholder="******* "
                />
                <button
                  type="button"
                  className=" absolute top-12 right-4  "
                  onClick={handleTogglePassword}
                >
                  {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                </button>
              </div>
              <input type="submit" value="Sign In" className="btn w-full" />
              <p className="text-sm">
                Don't Have Account? <Link>Sign Up</Link> here
              </p>
              <div className="divider py-5 ">OR</div>
              <div className="flex justify-center items-center  border-slate-400 m-3 p-2 rounded-md space-x-2 cursor-pointer bg-slate-200 hover:bg-slate-400  outline-0">
                <FcGoogle size={32}></FcGoogle>
                <p className="font-semibold text-lg">Continue With Google</p>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
