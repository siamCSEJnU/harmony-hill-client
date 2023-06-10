import { Helmet } from "react-helmet-async";
import Container from "../Components/Shared/Container/Container";
import { NavLink, Outlet } from "react-router-dom";
import adminLogo from "../assets/Dashboard/admin2.png";
import manageClasses from "../assets/Dashboard/manageClasses.png";
import manageUsers from "../assets/Dashboard/manageUsers.png";
import home from "../assets/Dashboard/Home.png";
import addClasses from "../assets/Dashboard/add.png";
import myClasses from "../assets/Dashboard/my-classes.png";
import instructor from "../assets/Dashboard/Instructor-dashboard.png";
import student from "../assets/Dashboard/student-dashboard.png";
import selected from "../assets/Dashboard/selected.png";
import enrolled from "../assets/Dashboard/enrolled.png";

const Dashboard = () => {
  const isAdmin = true;
  const isStudent = false;
  const isInstructor = false;
  return (
    <div>
      <Helmet>
        <title>Harmony Hill | Dashboard</title>
      </Helmet>
      <Container>
        <div className="drawer lg:drawer-open">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}

            <Outlet></Outlet>
            <label
              htmlFor="my-drawer"
              className="btn btn-primary drawer-button lg:hidden"
            >
              Open drawer
            </label>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 h-full bg-sky-200 text-lg font-semibold text-emerald-700">
              {/* Sidebar content here */}
              {isAdmin && (
                <>
                  <div className="flex items-center gap-2 mt-28 mb-10 ">
                    <img src={adminLogo} width={36} alt="adminLogo" />
                    <h2 className="text-2xl ">Admin Dashboard</h2>
                  </div>
                  <NavLink>
                    <div className="flex items-center gap-2">
                      <img src={manageClasses} width={28} alt="manageLogo" />
                      <h3>Manage Classes</h3>
                    </div>
                  </NavLink>
                  <NavLink>
                    <div className="flex items-center gap-2 my-5">
                      <img src={manageUsers} width={26} alt="manageLogo" />
                      <h3>Manage Users</h3>
                    </div>
                  </NavLink>
                </>
              )}
              {isInstructor && (
                <>
                  <div className="flex items-center gap-2 mt-28 mb-10 ">
                    <img src={instructor} width={36} alt="instructorLogo" />
                    <h2 className="text-2xl ">Instructor Dashboard</h2>
                  </div>
                  <NavLink>
                    <div className="flex items-center gap-2">
                      <img src={addClasses} width={28} alt="addClasses" />
                      <h3>Add Classes</h3>
                    </div>
                  </NavLink>
                  <NavLink>
                    <div className="flex items-center gap-2 my-5">
                      <img src={myClasses} width={26} alt="myclasses" />
                      <h3>My Classes</h3>
                    </div>
                  </NavLink>
                </>
              )}
              {isStudent && (
                <>
                  <div className="flex items-center gap-2 mt-28 mb-10 ">
                    <img src={student} width={36} alt="studentLogo" />
                    <h2 className="text-2xl ">Student Dashboard</h2>
                  </div>
                  <NavLink>
                    <div className="flex items-center gap-2">
                      <img src={selected} width={28} alt="selectedClasses" />
                      <h3>Selected Classes</h3>
                    </div>
                  </NavLink>
                  <NavLink>
                    <div className="flex items-center gap-2 my-5">
                      <img src={enrolled} width={26} alt="enrolledclasses" />
                      <h3>Enrolled Classes</h3>
                    </div>
                  </NavLink>
                </>
              )}

              <div className="divider"></div>
              <NavLink to="/">
                {" "}
                <div className="flex items-center gap-2 my-5">
                  <img src={home} width={28} alt="manageLogo" />
                  <h3>Home</h3>
                </div>
              </NavLink>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;