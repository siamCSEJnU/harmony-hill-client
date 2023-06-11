import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import adminLogo from "../../../assets/Dashboard/admin-mk.png";
import instructorLogo from "../../../assets/Dashboard/instructor-mk.png";
import SectionTItle from "../../../Components/Shared/SectionTitle/SectionTItle";
import Swal from "sweetalert2";
import Loader from "../../../Components/Shared/Loader/Loader";

const ManageUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");

    return res.data;
  });
  if (isLoading) {
    return <Loader></Loader>;
  }

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
          method: "PATCH",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount) {
              refetch();
              Swal.fire({
                position: "center",
                icon: "success",
                title: `${user.name} is Admin now!!`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  };
  const handleMakeInstructor = (user) => {
    Swal.fire({
      title: "Are you sure ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make instructor!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/users/instructor/${user._id}`, {
          method: "PATCH",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount) {
              refetch();
              Swal.fire({
                position: "center",
                icon: "success",
                title: `${user.name} is Instructor now!!`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  };
  return (
    <div>
      <Helmet>
        <title>Harmony Hill | Dashboard | Manage Users</title>
      </Helmet>
      <SectionTItle heading={`Total Users : ${users.length}`}></SectionTItle>
      <div className="overflow-x-auto ml-20">
        <table className="table">
          {/* head */}
          <thead className="bg-sky-300">
            <tr className="text-lg text-emerald-700">
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Make Admin</th>
              <th>Make Instructor</th>
            </tr>
          </thead>
          <tbody className="bg-emerald-300">
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user.photoURL} alt="userPhoto" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-lg">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="text-lg">{user.email}</td>
                <td className="text-lg font-semibold">{user.role}</td>
                <td>
                  <div
                    onClick={() => handleMakeAdmin(user)}
                    className="flex justify-center cursor-pointer"
                  >
                    {" "}
                    <img src={adminLogo} alt="adminlogo" width={25} />
                  </div>
                </td>
                <td>
                  <div
                    onClick={() => handleMakeInstructor(user)}
                    className="flex justify-center cursor-pointer"
                  >
                    {" "}
                    <img src={instructorLogo} alt="instructorlogo" width={25} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
