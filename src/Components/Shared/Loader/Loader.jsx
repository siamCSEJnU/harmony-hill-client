import { ScaleLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center items-center flex-col   h-[60vh]">
      {/* <div className="flex justify-center items-center flex-col h-[70vh]"> */}
      <ScaleLoader
        height={130}
        width={50}
        color="#6EE7B7"
        margin={8}
      ></ScaleLoader>
    </div>
  );
};

export default Loader;
