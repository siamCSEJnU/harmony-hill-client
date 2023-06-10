import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { setLoading, GoogleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    GoogleSignIn()
      .then((result) => {
        const loggedInUser = result.user;
        const saveUser = {
          name: loggedInUser.displayName,
          email: loggedInUser.email,
          photoURL: loggedInUser.photoURL,
          role: "student",
        };
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        })
          .then((response) => response.json())
          .then(() => {
            navigate(from, { replace: true });
          });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
      });
  };
  return (
    <div>
      <div className="divider py-5 ">OR</div>
      <div
        onClick={handleGoogleSignIn}
        className="flex justify-center items-center  border-slate-400 m-3 p-2 rounded-md space-x-2 cursor-pointer bg-slate-200 hover:bg-slate-400  outline-0"
      >
        <FcGoogle size={32}></FcGoogle>
        <p className="font-semibold text-lg">Continue With Google</p>
      </div>
    </div>
  );
};

export default SocialLogin;
