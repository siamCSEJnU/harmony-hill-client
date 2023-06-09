import Container from "../Container/Container";
import logo from "../../../../public/logo/logo1.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navOptions = (
    <>
      <Link to="/">
        <li>Home</li>
      </Link>
      <li>Instructors</li>
      <li>Classes</li>
      <li>Dashboard</li>
    </>
  );
  return (
    <div className="py-2 bg-sky-300 w-full fixed z-10">
      <Container>
        <div className="navbar  ">
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
            <div className="flex justify-center items-center gap-2">
              <h2 className="order-2 text-4xl font-bold text-sky-950 ">
                Harmony <br /> Hill
              </h2>
              <img src={logo} height="80" width="80" alt="logo" />
            </div>
          </div>
          <div className="navbar-center hidden lg:flex ">
            <ul className="menu menu-horizontal px-1 space-x-5 font-semibold text-lg ">
              {navOptions}
            </ul>
          </div>
          <div className="navbar-end">
            <Link to="/login">
              <button className="btn">Login</button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
