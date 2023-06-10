import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import slide2 from "../../../assets/slider/slide2.jpg";
import slide3 from "../../../assets/slider/slide3.jpg";
import slide4 from "../../../assets/slider/slide4.jpg";
import slide5 from "../../../assets/slider/slide1.jpg";
import slide6 from "../../../assets/slider/slide8.jpg";
import Container from "../../../Components/Shared/Container/Container";
const Banner = () => {
  return (
    <Container>
      <Carousel
        showArrows={true}
        showThumbs={false}
        // showIndicators={false}
        showStatus={false}
        autoPlay={false}
      >
        <div className="relative">
          <img style={{ height: "700px" }} src={slide5} />
          <div className="absolute z-10 top-32 md:top-1/3 bg-sky-200 bg-opacity-20 text-black w-2/3 p-5 ml-24 md:ml-16 space-y-5 ">
            <h3 className="text-6xl font-bold text-emerald-400">
              <span className="text-sky-600">Learn, Explore, and</span> Create
              Beautiful Music
            </h3>
            <p className=" hidden md:block font-semibold text-lg">
              Discover the joy of music at Harmony Hill. Our dedicated
              instructors are here to guide you on your musical journey, whether
              you're a beginner or advanced musician. Learn to play instruments,
              develop your vocal skills, and explore a variety of musical
              genres. With personalized instruction and a supportive
              environment, we'll help you unlock your musical potential and
              create beautiful melodies. Join us at Harmony Hill and let the
              music inspire you.
            </p>
            <button className="btn bg-emerald-400 border-emerald-400">
              Learn More
            </button>
          </div>
        </div>
        <div>
          <img style={{ height: "700px" }} src={slide2} />
          <div className="absolute z-10 top-32 md:top-1/3 bg-sky-200 bg-opacity-20 text-black w-2/3 p-5 ml-24 md:ml-16 space-y-5 ">
            <h3 className="text-6xl font-bold text-emerald-400">
              <span className="text-sky-600 ">Learn, Explore, and</span> Create
              Beautiful Music
            </h3>
            <p className="hidden md:block font-semibold text-lg">
              Discover the joy of music at Harmony Hill. Our dedicated
              instructors are here to guide you on your musical journey, whether
              you're a beginner or advanced musician. Learn to play instruments,
              develop your vocal skills, and explore a variety of musical
              genres. With personalized instruction and a supportive
              environment, we'll help you unlock your musical potential and
              create beautiful melodies. Join us at Harmony Hill and let the
              music inspire you.
            </p>
            <button className="btn bg-emerald-400 border-emerald-400">
              Learn More
            </button>
          </div>
        </div>
        <div>
          <img style={{ height: "700px" }} src={slide3} />
          <div className="absolute z-10 top-32 md:top-1/3 bg-sky-200 bg-opacity-20 text-black w-2/3 p-5 ml-24 md:ml-16 space-y-5 ">
            <h3 className="text-6xl font-bold text-emerald-400">
              <span className="text-sky-600">Learn, Explore, and</span> Create
              Beautiful Music
            </h3>
            <p className="font-semibold text-lg hidden md:block">
              Discover the joy of music at Harmony Hill. Our dedicated
              instructors are here to guide you on your musical journey, whether
              you're a beginner or advanced musician. Learn to play instruments,
              develop your vocal skills, and explore a variety of musical
              genres. With personalized instruction and a supportive
              environment, we'll help you unlock your musical potential and
              create beautiful melodies. Join us at Harmony Hill and let the
              music inspire you.
            </p>
            <button className="btn bg-emerald-400 border-emerald-400">
              Learn More
            </button>
          </div>
        </div>
        <div>
          <img style={{ height: "700px" }} src={slide4} />
          <div className="absolute z-10 top-32 md:top-1/3 bg-sky-200 bg-opacity-20 text-black w-2/3 p-5 ml-24 md:ml-16 space-y-5 ">
            <h3 className="text-6xl font-bold text-emerald-400">
              <span className="text-sky-600">Learn, Explore, and</span> Create
              Beautiful Music
            </h3>
            <p className="font-semibold text-lg hidden md:block">
              Discover the joy of music at Harmony Hill. Our dedicated
              instructors are here to guide you on your musical journey, whether
              you're a beginner or advanced musician. Learn to play instruments,
              develop your vocal skills, and explore a variety of musical
              genres. With personalized instruction and a supportive
              environment, we'll help you unlock your musical potential and
              create beautiful melodies. Join us at Harmony Hill and let the
              music inspire you.
            </p>
            <button className="btn bg-emerald-400 border-emerald-400">
              Learn More
            </button>
          </div>
        </div>
        <div>
          <img style={{ height: "700px" }} src={slide6} />
          <div className="absolute z-10 top-32 md:top-1/3 bg-sky-200 bg-opacity-20 text-black w-2/3 p-5 ml-24 md:ml-16 space-y-5 ">
            <h3 className="text-6xl font-bold text-emerald-400">
              <span className="text-sky-600">Learn, Explore, and</span> Create
              Beautiful Music
            </h3>
            <p className="font-semibold text-lg hidden md:block">
              Discover the joy of music at Harmony Hill. Our dedicated
              instructors are here to guide you on your musical journey, whether
              you're a beginner or advanced musician. Learn to play instruments,
              develop your vocal skills, and explore a variety of musical
              genres. With personalized instruction and a supportive
              environment, we'll help you unlock your musical potential and
              create beautiful melodies. Join us at Harmony Hill and let the
              music inspire you.
            </p>
            <button className="btn bg-emerald-400 border-emerald-400">
              Learn More
            </button>
          </div>
        </div>
      </Carousel>
    </Container>
  );
};

export default Banner;
