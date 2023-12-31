import Container from "../Container/Container";
import logo from "../../../../public/logo/logo1.png";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navOptions = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "text-white  " : "")}
      >
        <li>Home</li>
      </NavLink>
      <NavLink
        to="/allClasses"
        className={({ isActive }) => (isActive ? "text-white  " : "")}
      >
        <li>Classes</li>
      </NavLink>
      <NavLink
        to="/instructors"
        className={({ isActive }) => (isActive ? "text-white  " : "")}
      >
        <li>Instructors</li>
      </NavLink>
      <NavLink
        to="/blogs"
        className={({ isActive }) => (isActive ? "text-white  " : "")}
      >
        <li>Blogs</li>
      </NavLink>

      {user && (
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "text-white" : "")}
        >
          {" "}
          <li>Dashboard</li>
        </NavLink>
      )}
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("Signed Out Successfuly");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className=" bg-sky-300 opacity-80 text-black w-full fixed z-10">
      <Container>
        <div className="navbar ">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-sky-300 rounded-box w-52 space-y-2 font-semibold text-lg "
              >
                {navOptions}
              </ul>
            </div>
            <Link to="/">
              <div className="flex justify-center items-center gap-2 ">
                <h2 className="order-2 text-4xl font-bold text-black ">
                  Harmony <br /> Hill
                </h2>
                <img src={logo} height="80" width="80" alt="logo" />
              </div>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex ">
            <ul className="menu menu-horizontal px-1 space-x-5 font-semibold text-lg ">
              {navOptions}
            </ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <div className="flex items-center gap-2">
                <div
                  className="lg:tooltip tooltip-top"
                  data-tip={user.displayName}
                >
                  <img
                    src={user.photoURL}
                    className="rounded-full h-14 w-14"
                    alt="userphoto"
                  />
                </div>

                <button
                  onClick={handleLogOut}
                  className="btn  bg-emerald-400 border-emerald-400 text-base font-bold text-black"
                >
                  LogOut
                </button>
              </div>
            ) : (
              <Link to="/login">
                <button className="btn bg-emerald-400 border-emerald-400 text-base text-black font-bold">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
