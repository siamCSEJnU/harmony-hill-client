// import { useQuery } from "@tanstack/react-query";
// import Swiper from "react-id-swiper";
// import "swiper/css";
// import "swiper/css/pagination";
// // import "swiper/css/swiper.css";
// import Loader from "../../../Components/Shared/Loader/Loader";
// import SectionTItle from "../../../Components/Shared/SectionTitle/SectionTItle";

// const TopStudents = () => {
//   const { data: allStudents = [], isLoading } = useQuery(
//     ["allStudents"],
//     async () => {
//       const response = await fetch("http://localhost:5000/studentUsers");
//       return response.json();
//     }
//   );
//   if (isLoading) {
//     return <Loader></Loader>;
//   }
//   const filteredStudents = allStudents.filter(
//     (student) => student.email !== "johnsmith@gmail.com"
//   );
//   const images = filteredStudents?.map((student) => student.photoURL);
//   console.log(filteredStudents);

//   const params = {
//     effect: "coverflow",
//     grabCursor: true,
//     centeredSlides: true,
//     slidesPerView: "auto",
//     coverflowEffect: {
//       rotate: 50,
//       stretch: 0,
//       depth: 100,
//       modifier: 1,
//       slideShadows: true,
//     },
//     pagination: {
//       el: ".swiper-pagination",
//     },
//   };
//   return (
//     <div>
//       <SectionTItle heading={"Our Top Boys"}></SectionTItle>
//       <Swiper {...params}>
//         {images.map((imageUrl, index) => (
//           <div key={index} style={{ backgroundImage: `url(${imageUrl})` }} />
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default TopStudents;
