import { useQuery } from "@tanstack/react-query";

const useInstructorsData = () => {
  const { data } = useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/instructors");
      return response.json();
    },
  });

  if (!data) {
    return []; // Return an empty array if data is undefined
  }

  //   const { instructors, classes } = data;
  const { instructors = [], classes = [] } = data;
  const instructorWithClasses = instructors.map((instructor) => {
    const classesTaken = classes.filter(
      (classItem) => classItem.email == instructor.email
    );
    return {
      id: instructor._id,
      name: instructor.name,
      email: instructor.email,
      image: instructor.photoURL,
      classesInfo: classesTaken,
      classesTaken: classesTaken.map((classItem) => classItem.class),
      totalClasses: classesTaken.length,
    };
  });
  //   console.log(instructorWithClasses);
  return instructorWithClasses;
};

export default useInstructorsData;
