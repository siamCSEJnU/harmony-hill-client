import { Helmet } from "react-helmet-async";
import SectionTItle from "../../Components/Shared/SectionTitle/SectionTItle";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Shared/Loader/Loader";
import Container from "../../Components/Shared/Container/Container";
import ClassItem from "./ClassItem";

const AllClasses = () => {
  const { data: allClasses = [], isLoading } = useQuery(
    ["allClasses"],
    async () => {
      const response = await fetch("http://localhost:5000/allClasses");
      return response.json();
    }
  );

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div>
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
