import { NavLink } from "react-router-dom";

const PopularClassItem = ({ item }) => {
  const handleViewDetails = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div
      //   style={{ width: "400px" }}
      className=" p-3 group rounded-md shadow-md bg-blue-100 shadow-teal-400"
    >
      <img
        src={item.image}
        alt="instructorPhoto"
        className="w-full rounded-md mb-3  group-hover:scale-105"
      />
      <div className=" font-semibold text-lg ">
        <div className="h-20 overflow-hidden space-y-1   ">
          <h3 className="text-3xl font-bold text-center text-blue-500 ">
            {item.name}
          </h3>
          <p className="text-center font-bold ">
            Instructor : {item.instructor}
          </p>
        </div>
        <div className="h-24 mt-1 overflow-hidden space-y-1 ">
          <p>Available Seats : {item.available}</p>
          <p>Price : ${item.price}</p>
          <p>Enrolled : {item?.enrolled ? item.enrolled : 0}</p>
        </div>
        <div className="text-center mt-2 mb-1 ">
          <NavLink to="/allClasses">
            <button
              onClick={handleViewDetails}
              disabled={item?.available <= 0 ? true : false}
              className="btn w-full bg-emerald-400 outline-0 border-emerald-400  font-bold text-base "
            >
              View Details
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default PopularClassItem;
