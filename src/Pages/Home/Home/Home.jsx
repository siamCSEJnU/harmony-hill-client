import Banner from "../Banner/Banner";
import ClassicalMusic from "../ClassicalMusic/ClassicalMusic";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PopularClasses></PopularClasses>
      <PopularInstructors></PopularInstructors>
      <ClassicalMusic></ClassicalMusic>
    </div>
  );
};

export default Home;
