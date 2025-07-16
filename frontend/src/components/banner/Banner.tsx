import { FaPlay } from "react-icons/fa";

function Banner() {
  return (
    <div className="relative w-full h-[calc(100vh-70px)] sm:h-[calc(100vh-130px)] bg-center bg-banner1 bg-no-repeat text-white flex flex-col justify-center items-start animate-bgSlide">
      <div className="ml-6 sm:ml-10 md:ml-20 lg:ml-40">
        <p className="text-lg sm:text-xl">
          Working since 1999{" "}
          <span className="inline-block ml-3 w-10 h-[2px] bg-customeRed"></span>
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mt-2 leading-tight font-jost">
          Tuneup Your Car <br /> to Next Level
        </h1>
        <div className="flex items-center gap-4 sm:gap-6 mt-6 sm:mt-8">
          <a
            href="https://youtu.be/p-BQ7TD0t0Y?si=bj0ibE6GibylJ6-j"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-block transition-transform duration-300 hover:scale-110"
          >
            <button className="bg-customeRed rounded-full p-3 sm:p-5 group-hover:bg-white transition-colors duration-300">
              <FaPlay className="text-white text-lg sm:text-2xl group-hover:text-customeRed" />
            </button>
          </a>
          <div>
            <p className="font-semibold text-base sm:text-lg">
              WATCH INTRO VIDEO
            </p>
            <p className="text-sm sm:text-base">ABOUT US</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
