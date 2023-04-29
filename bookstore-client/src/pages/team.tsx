import Container from "@/components/Container";
import { AppProps } from "next/app";
import aboutBg from "@/media/images/about.jpg";
import nasirmovlamov from "@/media/images/nasirmovlamov.jpeg";
import alidamirov from "@/media/images/alidamirov.jpg";
import aytanakbarova from "@/media/images/aytanakbarova.png";

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
        <div className="mx-auto flex flex-wrap max-w-[1140px] px-[15px] gap-20 pt-10 pb-20">
          <div className="flex flex-col">
            <img
              src={nasirmovlamov.src}
              alt=""
              className="max-h-[280px] w-auto shadow-xl rounded-md"
            />
            <h3 className="text-start text-xl font-bold pt-5">
              Nasir Movlamov
            </h3>
          </div>
          <div className="flex flex-col">
            <img
              src={alidamirov.src}
              alt=""
              className="max-h-[280px] w-auto shadow-xl rounded-md"
            />
            <h3 className="text-start text-xl font-bold pt-5">Ali Damirov</h3>
          </div>

          <div className="flex flex-col">
            <img
              src={aytanakbarova.src}
              alt=""
              className="max-h-[280px] w-auto shadow-xl rounded-md"
            />
            <h3 className="text-start text-xl font-bold pt-5">
              Aytan Akbarova
            </h3>
          </div>
        </div>
      </Container>
    </div>
  );
}
