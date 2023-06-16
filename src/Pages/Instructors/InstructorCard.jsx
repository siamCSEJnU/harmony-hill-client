import { NavLink } from "react-router-dom";

const InstructorCard = ({ item }) => {
  return (
    <div className="bg-emerald-300 p-3 rounded-md space-y-3 group shadow-xl shadow-emerald-400">
      <img
        src={item.image}
        alt="instructorPhoto"
        className="w-72 rounded-md group-hover:scale-110 "
      />
      <div className="space-y-2 font-semibold text-lg ">
        <h3 className="text-3xl font-bold">{item.name}</h3>
        <p>{item.email}</p>
        <p>Number of classes : {item.totalClasses}</p>
      </div>
      <div className="text-center py-3">
        <NavLink to={`/instructors/${item.id}`}>
          {" "}
          <button className="btn bg-sky-400 outline-0 border-sky-400 font-bold text-base ">
            See Classes
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default InstructorCard;
