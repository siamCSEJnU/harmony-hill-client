import Container from "../../../Components/Shared/Container/Container";
import Loader from "../../../Components/Shared/Loader/Loader";
import SectionTItle from "../../../Components/Shared/SectionTitle/SectionTItle";
import useInstructorsData from "../../../hooks/useInstructorsData";
import PopularInstructorItem from "./PopularInstructorItem";

const PopularInstructors = () => {
  const [instructorWithClasses, isLoading] = useInstructorsData();
  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="py-10">
      <SectionTItle heading={"Popular Instructors"}></SectionTItle>

      <Container>
        {
          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 ">
            {/* <div className="flex gap-10 flex-wrap justify-center"> */}
            {instructorWithClasses?.map((instructor) => (
              <PopularInstructorItem
                key={instructor.id}
                instructor={instructor}
              ></PopularInstructorItem>
            ))}
          </div>
        }
      </Container>
    </div>
  );
};

export default PopularInstructors;
