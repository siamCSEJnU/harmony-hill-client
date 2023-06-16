import Container from "../../../Components/Shared/Container/Container";
import calssical from "../../../assets/classical/classical1.jpg";
import author from "../../../assets/classical/author.jpg";

const ClassicalMusic = () => {
  return (
    <div className="my-14">
      <Container>
        <a
          href="https://classicalbeast.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex flex-col md:flex-row justify-start items-center gap-5 shadow-2xl shadow-teal-400 rounded-2xl">
            <div>
              <img
                src={calssical}
                width={500}
                className="rounded-l-2xl"
                alt="classical"
              />
            </div>
            <div className="space-y-5 p-4 md:p-0">
              <h2 className="text-4xl font-bold text-slate-800">
                Classical Music Fundamentals :{" "}
                <span>
                  {" "}
                  Read <br /> More About It
                </span>
              </h2>
              <div className="flex items-center gap-5">
                <img
                  src={author}
                  className="rounded-full w-20 h-20"
                  alt="author"
                />
                <div>
                  <p className="font-semibold text-xl text-slate-600">
                    Mohammad Nahid Parvez
                  </p>
                  <p>Senior Instructor ,Harmoni Hill</p>
                  <p>174 students</p>
                </div>
              </div>
            </div>
          </div>
        </a>
      </Container>
    </div>
  );
};

export default ClassicalMusic;
