import { Helmet } from "react-helmet-async";
import SectionTItle from "../../Components/Shared/SectionTitle/SectionTItle";
import Container from "../../Components/Shared/Container/Container";
import InstructorCard from "./InstructorCard";
import useInstructorsData from "../../hooks/useInstructorsData";

const Instructors = () => {
  const instructorWithClasses = useInstructorsData();
  return (
    <div>
      <Helmet>
        {" "}
        <title>Harmony Hill | Instructors</title>
      </Helmet>
      <SectionTItle heading={"Our Instructors"}></SectionTItle>
      <Container>
        <div className="flex gap-20 flex-wrap justify-center">
          {instructorWithClasses.map((item) => (
            <InstructorCard key={item.email} item={item}></InstructorCard>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Instructors;
