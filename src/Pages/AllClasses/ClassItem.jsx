import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import { ImSpinner4 } from "react-icons/im";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

const ClassItem = ({ item }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // if (user) {
  //   const [allUsers] = useAllUsers();
  //   const currentUser = allUsers.find((item) => item.email == user?.email);
  // }

  const { data: userRole = {} } = useQuery(["userRole"], async () => {
    const response = await fetch(
      `http://localhost:5000/allUsers/${user.email}`
    );
    return response.json();
  });
  // console.log(userRole.Role);

  const [axiosSecure] = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handleSelectClass = (item) => {
    if (user && user.email) {
      setLoading(true);

      const { email, image, price, status, available } = item;
      const selectedClass = {
        name: item.name,
        instructor: item.instructor,
        studentEmail: user?.email,
        image,
        email,
        price,
        status,
        available: parseInt(available),
      };
      console.log(selectedClass);
      axiosSecure.post("/selectClass", selectedClass).then((response) => {
        if (response.data.insertedId) {
          setLoading(false);
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Class has been selected successfuly",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } else {
      Swal.fire({
        title: "Please login to select the class",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div
      className={` p-3 group rounded-md shadow-md shadow-sky-400 ${
        item?.available == 0 ? "bg-red-400 shadow-red-400" : "bg-blue-100"
      }`}
    >
      <img
        src={item.image}
        alt="instructorPhoto"
        className="w-full rounded-md mb-3  group-hover:scale-105"
      />
      <div className=" font-semibold text-lg ">
        <div className="h-28 overflow-hidden space-y-1   ">
          <h3 className="text-3xl font-bold text-center text-blue-500 ">
            {item.name}
          </h3>
          <p className="text-center font-bold ">
            Instructor : {item.instructor}
          </p>
        </div>
        <div className="h-16 mt-1 overflow-hidden space-y-1 ">
          <p>Available Seats : {item.available}</p>
          <p>Price : ${item.price}</p>
        </div>
        <div className="text-center mt-2 mb-1 ">
          <button
            disabled={
              item?.available <= 0 ||
              userRole.Role == "admin" ||
              userRole.Role == "instructor"
                ? true
                : false
            }
            onClick={() => handleSelectClass(item)}
            className="btn w-full bg-emerald-400 outline-0 border-emerald-400 "
          >
            {loading ? (
              <ImSpinner4
                className="animate-spin m-auto text-blue-800 font-bold text-base"
                size={32}
              ></ImSpinner4>
            ) : (
              "Select Class"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassItem;
