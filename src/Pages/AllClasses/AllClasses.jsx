import { Helmet } from "react-helmet-async";
import SectionTItle from "../../Components/Shared/SectionTitle/SectionTItle";
import Loader from "../../Components/Shared/Loader/Loader";
import Container from "../../Components/Shared/Container/Container";
import ClassItem from "./ClassItem";
import useAllClasses from "../../hooks/useAllClasses";

const AllClasses = () => {
  const [allClasses, isLoading] = useAllClasses();

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="mb-10">
      <Helmet>
        {" "}
        <title>Harmony Hill | All Classes</title>
      </Helmet>
      <SectionTItle heading={"All Classes"}></SectionTItle>
      <Container>
        <div className="grid md-grid-cols-3 lg:grid-cols-4 gap-10 ">
          {/* <div className="flex gap-20 flex-wrap justify-center"> */}
          {allClasses.map((item) => (
            <ClassItem key={item._id} item={item}></ClassItem>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllClasses;
