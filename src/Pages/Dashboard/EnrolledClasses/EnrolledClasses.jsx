import { Helmet } from "react-helmet-async";
import SectionTItle from "../../../Components/Shared/SectionTitle/SectionTItle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const EnrolledClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useAuth();
  const { data: fetchedClasses = [], refetch } = useQuery(
    ["selectedClasses"],
    async () => {
      const respone = await axiosSecure.get("/enrolledClasses");
      return respone.data;
    }
  );
  // console.log(selectedClasses);
  const myFetchedClasses = fetchedClasses?.filter(
    (item) => item.enrolledEmail == user.email
  );

  const mappedClasses = myFetchedClasses.map((item) => item.enrolledClasses);

  // console.log(mappedClasses);
  mappedClasses?.map((i) => i.map((j) => console.log(j)));

  return (
    <div>
      <Helmet>
        <title>Harmony Hill | Dashboard | Enrolled Classes</title>
      </Helmet>
      <SectionTItle heading={`My Enrolled Classes `}></SectionTItle>
      <div className="overflow-x-auto space-x-3 ml-10">
        <table className="table">
          {/* head */}
          <thead className="bg-sky-300">
            <tr className="text-lg text-emerald-700 ">
              <td>#</td>
              <th className="text-center">Class</th>
              <th className="text-center">Instructor</th>
              <th className="text-center">Contact</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody className="bg-emerald-300">
            {mappedClasses?.map((myEnrolledClasses, index) => {
              return myEnrolledClasses?.map((item) => {
                return (
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
                          <div className="font-bold text-lg">{item?.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="font-bold text-center text-lg">
                      {item.instructor}
                    </td>
                    <td className="font-semibold text-center text-base">
                      {item.email}
                    </td>
                    <td
                      className={`font-semibold text-center text-base ${
                        item?.status == "pending"
                          ? "text-green-600"
                          : item?.status == "accepted"
                          ? "text-blue-800"
                          : item?.status == "denied"
                          ? "text-red-600"
                          : ""
                      } `}
                    >
                      {item?.status == "pending"
                        ? "keep waiting"
                        : item?.status == "accepted"
                        ? "starting soon"
                        : item?.status == "denied"
                        ? "not available"
                        : "status not found"}
                    </td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrolledClasses;

// {myFetchedClasses?.map((item, index) => (
//   <tr key={item._id}>
//     <td className="font-bold text-lg">{index + 1}</td>
//     <td>
//       <div className="flex items-center space-x-3">
//         <div className="avatar">
//           <div className="mask mask-squircle w-12 h-12">
//             <img src={item.image} alt="classPhoto" />
//           </div>
//         </div>
//         <div>
//           <div className="font-bold text-lg">{item.instructor}</div>
//         </div>
//       </div>
//     </td>
//     <td className="font-bold text-center text-lg">
//       {item.instructor}
//     </td>
//     <td className="font-semibold text-center text-base">
//       {item.instructorEmail}
//     </td>
//     <td
//       className={`font-semibold text-center text-base ${
//         item?.status == "pending"
//           ? "text-green-600"
//           : item?.status == "accepted"
//           ? "text-blue-800"
//           : item?.status == "denied"
//           ? "text-red-600"
//           : ""
//       } `}
//     >
//       {item?.status == "pending"
//         ? "keep waiting"
//         : item?.status == "accepted"
//         ? "starting soon"
//         : item?.status == "denied"
//         ? "not available"
//         : "status not found"}
//     </td>
//   </tr>
// ))}
