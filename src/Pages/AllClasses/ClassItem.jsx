import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import { ImSpinner4 } from "react-icons/im";

const ClassItem = ({ item }) => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handleSelectClass = (item) => {
    if (!user) {
      return Swal.fire("Before selecting login please  !!");
    }
    setLoading(true);

    const { email, image, name, price, status, available } = item;
    const selectedClass = {
      name: item.class,
      instructor: name,
      studentEmail: user?.email,
      image,
      email,
      price,
      status,
      available,
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
  };

  return (
    <div
      className={` p-3 group rounded-md ${
        item?.available == 0 ? "bg-red-400" : "bg-blue-100"
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
            {item.class}
          </h3>
          <p className="text-center font-bold ">Instructor : {item.name}</p>
        </div>
        <div className="h-16 mt-1 overflow-hidden space-y-1 ">
          <p>Available Seats : {item.available}</p>
          <p>Price : ${item.price}</p>
        </div>
        <div className="text-center mt-2 mb-1 ">
          <button
            disabled={
              item?.available == 0 ||
              user?.role == "admin" ||
              user?.role == "instructor"
                ? true
                : false
            }
            onClick={() => handleSelectClass(item)}
            className="btn w-full bg-emerald-400 outline-0 border-emerald-400 "
          >
            {loading ? (
              <ImSpinner4
                className="animate-spin m-auto text-blue-800"
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
