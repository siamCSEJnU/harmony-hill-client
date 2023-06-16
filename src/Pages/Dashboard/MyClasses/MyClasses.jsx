import { Helmet } from "react-helmet-async";
import SectionTItle from "../../../Components/Shared/SectionTitle/SectionTItle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Components/Shared/Loader/Loader";
import editIcon from "../../../assets/Dashboard/pen.png";
import useAuth from "../../../hooks/useAuth";
const MyClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: allClasses = [],
    isLoading,
    // refetch,
  } = useQuery(["classes"], async () => {
    const response = await axiosSecure.get("/allClasses/instructor");
    return response.data;
  });

  if (isLoading) {
    return <Loader></Loader>;
  }
  const myClasses = allClasses.filter((item) => item.email === user.email);

  return (
    <div>
      <Helmet>
        <title>Harmony Hill | Dashboard | My Classes</title>
      </Helmet>
      <SectionTItle heading={`My Classes `}></SectionTItle>
      <div className="overflow-x-auto space-x-3 ml-10">
        <table className="table">
          {/* head */}
          <thead className="bg-sky-300">
            <tr className="text-lg text-emerald-700 ">
              <td>#</td>
              <th className="text-center">Class</th>
              <th>Available Seats</th>
              <th>Status</th>
              <th>Total Enrolled</th>
              <th className="text-center">Feedback</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody className="bg-emerald-300">
            {myClasses.map((item, index) => (
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
                <td className="font-semibold text-center text-xl">
                  {item.available}
                </td>
                <td
                  className={`font-semibold text-lg ${
                    item.status == "accepted"
                      ? "text-indigo-500"
                      : item.status == "pending"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {item.status}
                </td>
                <td className="text-center font-semibold text-lg">
                  {item?.enrolled ? item.enrolled : 0}
                </td>
                <td className=" font-semibold text-center ">
                  {item.feedback?.feedbackValue
                    ? item.feedback.feedbackValue
                    : "no feedback "}
                </td>

                <td>
                  {/* todo : update will be functional */}
                  <div className="text-center">
                    <button>
                      <img src={editIcon} className="w-7 " alt="edit" />
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

export default MyClasses;
