import { Helmet } from "react-helmet-async";
import Container from "../../Components/Shared/Container/Container";
import signupLogo from "../../assets/signup/SignUpLogo.png";
import signupImage from "../../assets/signup/SignUp-Image.png";
import SectionTItle from "../../Components/Shared/SectionTitle/SectionTItle";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { ImSpinner4 } from "react-icons/im";
import SocialLogin from "../../Components/Shared/SocialLogin/SocialLogin";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { loading, setLoading, createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleTogglePassword = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirm") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const handleSignUp = (data) => {
    console.log(data);
    if (data.password !== data.confirm) {
      return;
    }
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            const saveUser = {
              name: data.name,
              email: data.email,
              photoURL: data.photoURL,
              role: "student",
            };
            fetch("http://localhost:5000/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(saveUser),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  toast.success("User Created Successfuly", {
                    autoClose: 1000,
                  });
                  reset();
                  navigate(from, { replace: true });
                }
              });
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
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
                  htmlFor="name"
                  className="block mb-2 text-lg font-semibold "
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="border  rounded-md w-full px-3 py-2 border-sky-300 focus:outline-0  "
                  placeholder="Your Name "
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-600 text-sm">Name is required</span>
                )}
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
                  id="photoUrl"
                  className="border  rounded-md w-full px-3 py-2 border-sky-300 focus:outline-0  "
                  placeholder="Photo URL "
                  {...register("photoURL", { required: true })}
                />
                {errors.photoURL && (
                  <span className="text-red-600 text-sm">
                    photo url is required
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-lg font-semibold "
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="border  rounded-md w-full px-3 py-2 border-sky-300 focus:outline-0  "
                  placeholder="Your Email "
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-600 text-sm">
                    Email is required
                  </span>
                )}
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
                  onClick={() => handleTogglePassword("password")}
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
                  type={showConfirmPassword ? "text" : "password"}
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
                  onClick={() => handleTogglePassword("confirm")}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button
                type="submit"
                className="btn w-full bg-emerald-400 border-emerald-400"
              >
                {loading ? (
                  <ImSpinner4
                    className="animate-spin m-0 text-blue-700"
                    size={32}
                  ></ImSpinner4>
                ) : (
                  "Sign Up"
                )}
              </button>
              <p className="text-sm">
                Already Have an Account?{" "}
                <Link className="text-slate-200" to="/login">
                  Sign In
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

export default SignUp;
