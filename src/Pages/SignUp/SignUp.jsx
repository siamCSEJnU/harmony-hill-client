import { Helmet } from "react-helmet-async";
import Container from "../../Components/Shared/Container/Container";
import signupLogo from "../../assets/signup/SignUpLogo.png";
import signupImage from "../../assets/signup/SignUp-Image.png";
import SectionTItle from "../../Components/Shared/SectionTitle/SectionTItle";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const handleSignUp = (data) => {
    if (data.password !== data.confirm) {
      return;
    }
    console.log(data);
  };
  return (
    <div>
      <Helmet>
        <title>Harmony Hill | SignUp</title>
      </Helmet>
      <Container>
        <div className="flex justify-center items-center gap-2">
          <img src={signupLogo} alt="loginLogo" height="40" width="40" />
          <h2>
            <SectionTItle heading="Sign Up Here!"></SectionTItle>
          </h2>
        </div>

        <div className="flex justify-center items-center flex-wrap">
          <img src={signupImage} className="w-1/2" alt="loginImage" />

          <div className="flex justify-center">
            <form
              onSubmit={handleSubmit(handleSignUp)}
              className="flex-grow space-y-3 bg-sky-400 w-96 rounded-md p-5"
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
                  className="border  rounded-md w-full px-3 py-2 border-sky-300 focus:outline-0  "
                  placeholder="Enter Your Email Here "
                  {...register("email", { required: true })}
                />
              </div>
              <div>
                <label
                  htmlFor="photoUrl"
                  className="block mb-2 text-lg font-semibold "
                >
                  Photo URL
                </label>
                <input
                  type="text"
                  name="photoUrl"
                  id="photoUrl"
                  className="border  rounded-md w-full px-3 py-2 border-sky-300 focus:outline-0  "
                  placeholder="Photo URL "
                  {...register("photoUrl", { required: true })}
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
                  className="border  rounded-md  w-full  px-3 py-2 outline-0 "
                  placeholder="******* "
                  {...register("password", {
                    required: "Password is required.",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long.",
                    },
                    pattern: {
                      value: /(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{6,}/,
                      message:
                        "Password must contain at least one uppercase letter and one special character.",
                    },
                  })}
                />

                {errors.password?.type === "required" && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
                <button
                  type="button"
                  className=" absolute top-12 right-4  "
                  onClick={handleTogglePassword}
                >
                  {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                </button>
              </div>
              <div className="relative">
                <label
                  htmlFor="confirm"
                  className="block mb-2 text-lg font-semibold  "
                >
                  Confirm Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirm"
                  id="confirm"
                  className="border  rounded-md  w-full px-3 py-2 outline-0 "
                  placeholder="******* "
                  {...register("confirm", {
                    required: true,
                    validate: {
                      matchesPassword: (value) =>
                        value === watch("password") || "Password mismatched",
                    },
                  })}
                />
                {errors.confirm && (
                  <span className="text-red-500 text-sm">
                    {errors.confirm.message}
                  </span>
                )}
                <button
                  type="button"
                  className=" absolute top-12 right-4  "
                  onClick={handleTogglePassword}
                >
                  {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                </button>
              </div>
              <input
                type="submit"
                value="Sign Up"
                className="btn w-full bg-emerald-400 border-emerald-400"
              />
              <p className="text-sm">
                Already Have an Account?{" "}
                <Link className="text-slate-200" to="/login">
                  Sign In
                </Link>{" "}
                here
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

export default SignUp;
