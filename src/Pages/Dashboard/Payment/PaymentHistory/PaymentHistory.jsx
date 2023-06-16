import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Loader from "../../../../Components/Shared/Loader/Loader";
import { Helmet } from "react-helmet-async";
import SectionTItle from "../../../../Components/Shared/SectionTitle/SectionTItle";

const PaymentHistory = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: paymentData = [], isLoading } = useQuery(
    ["paymentData"],
    async () => {
      const response = await axiosSecure.get(
        `/payments/history/${user?.email}`
      );
      return response.data;
    }
  );

  if (isLoading) {
    return <Loader></Loader>;
  }

  const sortedPaymentData = paymentData.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  //   console.log(sortedPaymentData);

  return (
    <div className="pt-10">
      <Helmet>
        <title>Harmony Hill | Payment History</title>
      </Helmet>
      <SectionTItle heading={"Payment History"}></SectionTItle>
      <div className="overflow-x-auto space-x-3 ml-10">
        <table className="table">
          {/* head */}
          <thead className="bg-sky-300">
            <tr className="text-lg text-emerald-700 ">
              <td>#</td>
              <th className="text-center">Date</th>
              <th className="text-center">Transaction ID</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Amount</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody className="bg-emerald-300">
            {sortedPaymentData.map((item, index) => (
              <tr key={item._id}>
                <td className="font-semibold text-lg">{index + 1}</td>
                <td>
                  <div className="text-lg font-semibold">
                    {item?.date.slice(0, 10)}
                  </div>
                </td>
                <td className=" text-center text-base font-semibold">
                  {item?.transactionId === "false" ? "N/A" : item.transactionId}
                </td>
                <td className="font-semibold text-center text-lg">
                  {item.quantity}
                </td>
                <td className="font-semibold text-center text-base">
                  ${item.price}
                </td>
                <td className="font-semibold text-center text-teal-900 text-base">
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
