import { ScaleLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center items-center flex-col h-[70vh]">
      <ScaleLoader size={100} color="emerald"></ScaleLoader>
    </div>
  );
};

export default Loader;
