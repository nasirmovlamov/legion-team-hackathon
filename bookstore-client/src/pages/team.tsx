import Container from "@/components/Container";
import { AppProps } from "next/app";
import aboutBg from "@/media/images/about.jpg";
import nasirmovlamov from "@/media/images/nasirmovlamov.jpeg";
import alidamirov from "@/media/images/alidamirov.jpg";
import aytanakbarova from "@/media/images/aytanakbarova.png";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

export default function About({ Component, pageProps }: AppProps) {
  return (
    <div className="mx-auto">
      <div
        className="bg-[#00000093] h-[250px] flex justify-center items-center relative"
        style={{
          backgroundImage: `url(${aboutBg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full h-full top-0 left-0 absolute bg-[#00000093] z-10"></div>
        <h1 className="text-4xl text-white z-20">Our Team</h1>
      </div>
      <Container>
        <h2 className="text-[45px] text-center pt-10">Team members</h2>
        <div className="mx-auto flex justify-center flex-wrap max-w-[1140px] px-[15px] gap-20 pt-10 pb-20">
          <div className="flex flex-col">
            <div className="w-[280px] h-[280px] relative">
              <div className="absolute bottom-3 right-2 flex gap-2">
                <Link
                  className="z-20 bottom-0 right-0 "
                  href={"https://www.linkedin.com/in/nasirmovlamov/"}
                  target="_blank"
                >
                  <div className="text-blue-600  z-20 px-2 py-1 bg-white shadow-md rounded-md">
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </div>
                </Link>
                <Link
                  className="z-20 bottom-0 right-0 "
                  href={"https://github.com/nasirmovlamov"}
                  target="_blank"
                >
                  <div className="text-black  z-20 px-2 py-1 bg-white shadow-md rounded-md">
                    <FontAwesomeIcon icon={faGithub} />
                  </div>
                </Link>
              </div>

              <div className=" text-xs py-1 px-2 absolute bottom-3 left-2 flex gap-2 bg-white shadow-md rounded-md z-20">
                👨‍💻 Software Engineer
              </div>

              <img
                src={nasirmovlamov.src}
                alt=""
                className="max-h-[280px] w-auto shadow-xl rounded-md absolute z-10 top-0 left-0"
              />
            </div>
            <h3 className="text-start text-xl font-bold pt-5">
              Nasir Movlamov
            </h3>
          </div>

          <div className="flex flex-col">
            <div className="w-[280px] h-[280px] relative">
              <div className="absolute bottom-3 right-2 flex gap-2">
                <Link
                  className="z-20 bottom-0 right-0 "
                  href={"https://www.linkedin.com/in/alakbar-damirov-545861224"}
                  target="_blank"
                >
                  <div className="text-blue-600  z-20 px-2 py-1 bg-white shadow-md rounded-md">
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </div>
                </Link>
                <Link
                  className="z-20 bottom-0 right-0 "
                  href={"https://github.com/Alis192"}
                  target="_blank"
                >
                  <div className="text-black  z-20 px-2 py-1 bg-white shadow-md rounded-md">
                    <FontAwesomeIcon icon={faGithub} />
                  </div>
                </Link>
              </div>

              <div className=" text-xs py-1 px-2 absolute bottom-3 left-2 flex gap-2 bg-white shadow-md rounded-md z-20">
                👨‍💻 Software Engineer
              </div>

              <img
                src={alidamirov.src}
                alt=""
                className="max-h-[280px] w-auto shadow-xl rounded-md absolute z-10 top-0 left-0"
              />
            </div>
            <h3 className="text-start text-xl font-bold pt-5">
              Alakbar Damirov
            </h3>
          </div>

          <div className="flex flex-col">
            <div className="w-[280px] h-[280px] relative">
              <div className="absolute bottom-3 right-2 flex gap-2">
                <Link
                  className="z-20 bottom-0 right-0 "
                  href={" https://www.linkedin.com/in/aytan-alakberova"}
                  target="_blank"
                >
                  <div className="text-blue-600  z-20 px-2 py-1 bg-white shadow-md rounded-md">
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </div>
                </Link>
                <Link
                  className="z-20 bottom-0 right-0 "
                  href={" https://github.com/aytan-akbar"}
                  target="_blank"
                >
                  <div className="text-black  z-20 px-2 py-1 bg-white shadow-md rounded-md">
                    <FontAwesomeIcon icon={faGithub} />
                  </div>
                </Link>
              </div>

              <div className=" text-xs py-1 px-2 absolute bottom-3 left-2 flex gap-2 bg-white shadow-md rounded-md z-20">
                👩‍💻 Data Analyst
              </div>

              <img
                src={aytanakbarova.src}
                alt=""
                className="max-h-[280px] w-auto shadow-xl rounded-md absolute z-10 top-0 left-0"
              />
            </div>
            <h3 className="text-start text-xl font-bold pt-5">
              Aytan Alakbarova
            </h3>
          </div>
        </div>
      </Container>
    </div>
  );
}
