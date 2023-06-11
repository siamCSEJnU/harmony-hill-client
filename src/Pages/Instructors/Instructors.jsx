import { Helmet } from "react-helmet-async";
import SectionTItle from "../../Components/Shared/SectionTitle/SectionTItle";
import Container from "../../Components/Shared/Container/Container";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Shared/Loader/Loader";
import { toast } from "react-hot-toast";

const Instructors = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/instructors");
      return response.json();
    },
  });

  if (isLoading) {
    return <Loader></Loader>;
  }

  if (error) {
    return toast.error(error.message);
  }

  const { instructors, classes } = data;
  const instructorWithClasses = instructors.map((instructor) => {
    const classesTaken = classes.filter(
      (classItem) => classItem.email == instructor.email
    );
    return {
      name: instructor.name,
      email: instructor.email,
      classesTaken: classesTaken.map((classItem) => classItem.class),
      totalClasses: classesTaken.length,
    };
  });
  console.log(instructorWithClasses);

  return (
    <div>
      <Helmet>
        {" "}
        <title>Harmony Hill | Instructors</title>
      </Helmet>
      <SectionTItle heading={"Our Instructors"}></SectionTItle>
      <Container></Container>
    </div>
  );
};

export default Instructors;
