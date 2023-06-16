import { NavLink } from "react-router-dom";

const PopularInstructorItem = ({ instructor }) => {
  const handleViewDetails = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div
      //   style={{ width: "400px" }}
      className=" p-3 group rounded-md bg-emerald-400  shadow-emerald-300 shadow-md"
    >
      <img
        src={instructor.image}
        alt="instructorPhoto"
        className="w-full rounded-md mb-3  group-hover:scale-105"
      />
      <div className=" font-semibold text-lg ">
        <div className="h-11 overflow-hidden space-y-1   ">
          <h3 className="text-3xl font-bold text-center ">{instructor.name}</h3>
        </div>
        <div className="h-16 mt-1 overflow-hidden space-y-1 ">
          <p>Total Classes : {instructor.totalClasses}</p>
          <p>
            Current Students :
            {Object.values(instructor?.classesInfo || {}).reduce(
              (sum, item) => sum + (item.enrolled || 0),
              0
            )}
          </p>
        </div>
        <div className="text-center mt-2 mb-1 ">
          <NavLink to="/instructors">
            <button
              onClick={handleViewDetails}
              className="btn w-full bg-sky-400 outline-0 border-sky-400 font-bold text-base   "
            >
              View Details
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default PopularInstructorItem;
