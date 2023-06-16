import { Helmet } from "react-helmet-async";
import SectionTItle from "../../Components/Shared/SectionTitle/SectionTItle";
import Container from "../../Components/Shared/Container/Container";
import InstructorCard from "./InstructorCard";
import useInstructorsData from "../../hooks/useInstructorsData";
import Loader from "../../Components/Shared/Loader/Loader";

const Instructors = () => {
  const [instructorWithClasses, isLoading] = useInstructorsData();

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="mb-10">
      <Helmet>
        {" "}
        <title>Harmony Hill | Instructors</title>
      </Helmet>
      <SectionTItle heading={"Our Instructors"}></SectionTItle>
      <Container>
        <div className="flex gap-20 flex-wrap justify-center">
          {instructorWithClasses?.map((item) => (
            <InstructorCard key={item.email} item={item}></InstructorCard>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Instructors;
