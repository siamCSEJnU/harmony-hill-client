import { NavLink } from "react-router-dom";

const ClassItem = ({ item }) => {
  console.log(item);
  return (
    <div className="bg-blue-100 p-3  rounded-md  ">
      <img
        src={item.image}
        alt="instructorPhoto"
        className="w-full rounded-md mb-3 "
      />
      <div className=" font-semibold text-lg ">
        <div className="h-28 overflow-hidden space-y-1   ">
          <h3 className="text-3xl font-bold text-center ">{item.class}</h3>
          <p className="text-center font-bold ">Instructor : {item.name}</p>
        </div>
        <div className="h-16 mt-1 overflow-hidden space-y-1 ">
          <p>Available Seats : {item.available}</p>
          <p>Price : ${item.price}</p>
        </div>
        <div className="text-center mt-2 mb-1 ">
          <button className="btn w-full bg-emerald-400 outline-0 border-emerald-400 ">
            Select Class
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassItem;
