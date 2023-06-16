import Lottie from "lottie-react";
import erorAnim from "./error2.json";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center">
      <Lottie className="w-2/5" animationData={erorAnim}></Lottie>
    </div>
  );
};

export default ErrorPage;
