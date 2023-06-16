import { Helmet } from "react-helmet-async";
import Container from "../../Components/Shared/Container/Container";
import { useParams } from "react-router-dom";
import useInstructorsData from "../../hooks/useInstructorsData";
import ClassCard from "./ClassCard";

const InstructorDetails = () => {
  const { id } = useParams();
  const [instructorWithClasses] = useInstructorsData();
  const selected = instructorWithClasses?.find(
    (instructor) => instructor?.id == id
  );

  return (
    <div>
      <Helmet>
        {" "}
        <title>Harmony Hill | Instructors | Details</title>{" "}
      </Helmet>
      <Container>
        <div className="flex justify-center items-center gap-6 py-10 bg-emerald-300 ">
          <img
            src={selected?.image}
            className="rounded-full  w-96 h-96"
            alt="instructorPhoto"
          />
          <div className="space-y-2">
            <h3 className="text-4xl font-bold">{selected?.name}</h3>
            <p className="text-end italic">{selected?.email}</p>
          </div>
        </div>
        <div>
          <h2 className="text-4xl font-bold mt-16 mb-12 text-center">
            My Classes
          </h2>
        </div>
        <div className="flex justify-center  gap-16 flex-wrap">
          {selected?.classesInfo?.map((item) => (
            <ClassCard key={item._id} item={item}></ClassCard>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default InstructorDetails;
