import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../Components/Shared/Loader/Loader";
import accept from "../../../assets/Dashboard/accepted.png";
import reject from "../../../assets/Dashboard/rejected.png";
import feedback from "../../../assets/Dashboard/feedback.png";
import Swal from "sweetalert2";
import SectionTItle from "../../../Components/Shared/SectionTitle/SectionTItle";

const ManageClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [feedbackValue, setFeedbackValue] = useState("");

  const {
    data: classes = [],
    isLoading,
    refetch,
  } = useQuery(["classes"], async () => {
    const response = await axiosSecure.get("/classes");
    return response.data;
  });

  if (isLoading) {
    return <Loader></Loader>;
  }

  //change status to accept
  const handleAccept = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Accept!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/class/accept/${item._id}`, {
          method: "PATCH",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${item.class} accepted!!`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  };

  //change status to reject
  const handleReject = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/class/reject/${item._id}`, {
          method: "PATCH",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${item.class} rejected!!`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  };

  const handleOpenFeedbackModal = (item) => {
    setSelectedClass(item);
    setShowFeedbackModal(true);
  };

  const handleCloseFeedbackModal = () => {
    setSelectedClass(null);
    setShowFeedbackModal(false);
    setFeedbackValue("");
  };

  const handleSendFeedback = (item) => {
    // Send the feedback to the server
    fetch(`http://localhost:5000/class/feedback/${item._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ feedbackValue }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Feedback sent successfuly!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });

    setShowFeedbackModal(false);
  };

  console.log(classes);
  return (
    <div>
      <Helmet>
        <title>Harmony Hill | Dashboard | Manage Classes</title>
      </Helmet>
      <SectionTItle
        heading={`Total Classes : ${classes.length} `}
      ></SectionTItle>
      <div className="overflow-x-auto space-x-3 ml-3">
        <table className="table">
          {/* head */}
          <thead className="bg-sky-300">
            <tr className="text-lg text-emerald-700 ">
              <th>Class</th>
              <th>Instructor</th>
              <th>Email</th>
              <th>Available Seats</th>
              <th>Price</th>
              <th>Status</th>
              <th>Accept</th>
              <th>Deny</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody className="bg-emerald-300">
            {classes.map((item) => (
              <tr key={item._id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.image} alt="classPhoto" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.class}</div>
                    </div>
                  </div>
                </td>
                <td className="font-semibold">{item.name}</td>
                <td className="">{item.email}</td>
                <td className=" text-center font-semibold ">
                  {item.available}
                </td>
                <td className=" text-end  font-semibold">${item.price}</td>
                <td
                  className={`top-end ${
                    item.status === "accepted"
                      ? "font-bold"
                      : item.status === "denied"
                      ? "text-red-600 font-bold"
                      : ""
                  }`}
                >
                  {item.status}
                </td>
                <td>
                  <div className="text-center">
                    <button
                      onClick={() => handleAccept(item)}
                      disabled={
                        item.status === "denied" || item.status === "accepted"
                      }
                      className={`${
                        item.status === "accepted" || item.status === "denied"
                          ? "opacity-40"
                          : ""
                      }`}
                    >
                      <img src={accept} className="w-7" alt="accept" />
                    </button>
                  </div>
                </td>
                <td>
                  <div className="text-center">
                    <button
                      onClick={() => handleReject(item)}
                      disabled={
                        item.status === "denied" || item.status === "accepted"
                      }
                      className={`${
                        item.status === "denied" || item.status === "accepted"
                          ? "opacity-40"
                          : ""
                      }`}
                    >
                      <img src={reject} className="w-7 " alt="reject" />
                    </button>
                  </div>
                </td>
                <td>
                  <div className="text-center">
                    <button
                      onClick={() => handleOpenFeedbackModal(item)}
                      disabled={
                        item.status == "accepted" || item.status == "pending"
                          ? true
                          : false
                      }
                      className={`${
                        item.status == "accepted" || item.status == "pending"
                          ? "opacity-40"
                          : ""
                      }`}
                      // disabled={
                      //   item.status === "denied" || item.status === "accepted"
                      // }
                    >
                      <img src={feedback} className="w-7 " alt="feedback" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && selectedClass && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-sky-200 rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">
              Send Feedback for {selectedClass.class}
            </h2>
            <textarea
              className="w-full h-32 border border-gray-300 outline-0 rounded-lg p-2 mb-4"
              placeholder="Enter your feedback"
              value={feedbackValue}
              onChange={(e) => setFeedbackValue(e.target.value)}
            ></textarea>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg mr-2"
                onClick={handleCloseFeedbackModal}
              >
                Cancel
              </button>
              <button
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg"
                onClick={() => handleSendFeedback(selectedClass)}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageClasses;
