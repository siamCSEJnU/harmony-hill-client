import { useQuery } from "@tanstack/react-query";
import Container from "../../../Components/Shared/Container/Container";
import SectionTItle from "../../../Components/Shared/SectionTitle/SectionTItle";
import Loader from "../../../Components/Shared/Loader/Loader";
import PopularClassItem from "./PopularClassItem";

const PopularClasses = () => {
  const { data = [], isLoading } = useQuery(["popularClasses"], async () => {
    const response = await fetch("http://localhost:5000/popularClasses");
    return response.json();
  });

  if (isLoading) {
    return <Loader></Loader>;
  }
  //   console.log(data);

  const popularClasses = data?.slice(0, 6);

  return (
    <div className="pt-10">
      <SectionTItle heading={"Popular Classes"}></SectionTItle>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 ">
          {/* <div className="flex gap-10 flex-wrap justify-center"> */}
          {popularClasses.map((item) => (
            <PopularClassItem key={item._id} item={item}></PopularClassItem>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default PopularClasses;
