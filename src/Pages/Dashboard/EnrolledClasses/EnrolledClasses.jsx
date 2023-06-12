import { Helmet } from "react-helmet-async";
import SectionTItle from "../../../Components/Shared/SectionTitle/SectionTItle";

const EnrolledClasses = () => {
  return (
    <div>
      <Helmet>
        <title>Harmony Hill | Dashboard | Enrolled Classes</title>
      </Helmet>
      <SectionTItle heading={`My Enrolled Classes `}></SectionTItle>
    </div>
  );
};

export default EnrolledClasses;
