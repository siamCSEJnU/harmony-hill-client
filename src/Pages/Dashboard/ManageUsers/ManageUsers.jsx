import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import adminLogo from "../../../assets/Dashboard/admin-mk.png";
import instructorLogo from "../../../assets/Dashboard/instructor-mk.png";
import SectionTItle from "../../../Components/Shared/SectionTitle/SectionTItle";

const ManageUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");

    return res.data;
  });
  return (
    <div>
      <Helmet>
        <title>Harmony Hill | Manage Users</title>
      </Helmet>
      <SectionTItle heading={`Total Users : ${users.length}`}></SectionTItle>
      <div className="overflow-x-auto  ml-5">
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
                    className="flex justify-center"
                  >
                    {" "}
                    <img src={adminLogo} alt="adminlogo" width={25} />
                  </div>
                </td>
                <td>
                  <div className="flex justify-center">
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
// Swal.fire({
//     title: 'Are you sure?',
//     text: "You won't be able to revert this!",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Yes, delete it!'
//   }).then((result) => {
//     if (result.isConfirmed) {
//       Swal.fire(
//         'Deleted!',
//         'Your file has been deleted.',
//         'success'
//       )
//     }
//   })
