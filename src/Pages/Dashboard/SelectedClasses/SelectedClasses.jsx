import { Helmet } from "react-helmet-async";
import SectionTItle from "../../../Components/Shared/SectionTitle/SectionTItle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import deleteIcon from "../../../assets/Dashboard/delete.png";
import paymentIcon from "../../../assets/Dashboard/payment.png";
import Swal from "sweetalert2";

const SelectedClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useAuth();
  const { data: selectedClasses = [], refetch } = useQuery(
    ["selectedClasses"],
    async () => {
      const respone = await axiosSecure.get("/selectedClasses");
      return respone.data;
    }
  );
  // console.log(selectedClasses);
  const mySelectedClasses = selectedClasses.filter(
    (item) => item.studentEmail == user.email
  );

  const handleDelete = (Id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/selectedClass/delete/${Id}`)
          .then((response) => {
            const { deletedCount } = response.data;
            if (deletedCount) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "This class has been deleted successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `Something went wrong while deleting the class! Error :${
                error ? error : ""
              }`,
            });
          });
      }
    });
  };

  return (
    <div className="mt-36">
      <Helmet>
        <title>Harmony Hill | Dashboard | Selected Classes</title>
      </Helmet>
      <SectionTItle heading={`My Selected Classes `}></SectionTItle>
      <div className="overflow-x-auto space-x-3 ml-10">
        <table className="table">
          {/* head */}
          <thead className="bg-sky-300">
            <tr className="text-lg text-emerald-700 ">
              <td>#</td>
              <th className="text-center">Class</th>
              <th>Instructor</th>
              <th className="text-center">Contact</th>
              <th>Available</th>
              <th>Delete</th>
              <th>Pay</th>
            </tr>
          </thead>
          <tbody className="bg-emerald-300">
            {mySelectedClasses.map((item, index) => (
              <tr key={item._id}>
                <td className="font-bold text-lg">{index + 1}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.image} alt="classPhoto" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-lg">{item.name}</div>
                    </div>
                  </div>
                </td>
                <td className="font-bold text-center text-lg">
                  {item.instructor}
                </td>
                <td className="font-semibold text-center text-base">
                  {item.email}
                </td>
                <td className="font-semibold text-center text-xl">
                  {item.available}
                </td>
                <td>
                  <div className="text-center">
                    <button onClick={() => handleDelete(item._id)}>
                      <img src={deleteIcon} className="w-7 " alt="delete" />
                    </button>
                  </div>
                </td>
                <td>
                  <div className="text-center">
                    <button>
                      <img src={paymentIcon} className="w-7 " alt="edit" />
                    </button>
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

export default SelectedClasses;
