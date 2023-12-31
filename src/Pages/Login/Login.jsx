import { Helmet } from "react-helmet-async";
import SectionTItle from "../../Components/Shared/SectionTitle/SectionTItle";
import loginLogo from "../../assets/login/loginLogo.png";
import Container from "../../Components/Shared/Container/Container";
import loginImage from "../../assets/login/login.png";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ImSpinner4 } from "react-icons/im";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import SocialLogin from "../../Components/Shared/SocialLogin/SocialLogin";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading, setLoading, signIn } = useAuth();
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const { register, handleSubmit, reset } = useForm();

  const handleLogin = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setLoading(false);
        setLoginError(error.message);
        toast.error(loginError);
        console.log(error);
      });
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
            <form
              onSubmit={handleSubmit(handleLogin)}
              className="flex-grow space-y-3 bg-sky-400 w-80 rounded-md p-5"
            >
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
                  className="border  rounded-md w-full px-3 py-2 border-sky-400 focus:outline-0  "
                  placeholder="Enter Your Email Here "
                  {...register("email", { required: true })}
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
                  {...register("password", { required: true })}
                />
                {loginError && (
                  <span className="text-red-600 text-sm">{loginError}</span>
                )}

                <button
                  type="button"
                  className=" absolute top-12 right-4  "
                  onClick={handleTogglePassword}
                >
                  {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                </button>
              </div>
              <button
                type="submit"
                className="btn w-full bg-emerald-400 border-emerald-400"
              >
                {loading ? (
                  <ImSpinner4
                    className="animate-spin m-auto text-blue-800"
                    size={32}
                  ></ImSpinner4>
                ) : (
                  "Sign In"
                )}
              </button>
              <p className="text-sm">
                Don't Have Account?{" "}
                <Link className="text-slate-200" to="/signup">
                  Sign Up
                </Link>{" "}
                here
              </p>
              <SocialLogin></SocialLogin>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
