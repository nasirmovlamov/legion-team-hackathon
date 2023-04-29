import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Copyright from "./Copyright";
import {
  faDiscord,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import logoFooter from "../media/images/bookbazzarlogo.png";

import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
export const Footer = () => {
  return (
    <footer className="flex justify-center bg-[#163676] text-white flex-col items-center pt-10">
      <div className="flex flex-col max-w-[720px] w-full items-center h-full px-4 box-border">
        <div className="flex gap-4">
          <a target="_blank" href="">
            <div className="flex justify-center items-center rounded-full h-[48px] w-[48px] bg-white">
              {/* youtube color */}
              <FontAwesomeIcon icon={faYoutube} className="text-[#FF0000]" />
            </div>
          </a>
          <a target="_blank" href="">
            <div className="flex justify-center items-center rounded-full h-[48px] w-[48px] bg-white">
              <FontAwesomeIcon icon={faInstagram} className="text-[#E1306C]" />
            </div>
          </a>
          <a target="_blank" href="">
            <div className="flex justify-center items-center rounded-full h-[48px] w-[48px] bg-white">
              <FontAwesomeIcon icon={faDiscord} className="text-[#7289DA]" />
            </div>
          </a>
          {/* <div className="flex justify-center items-center rounded-full h-[48px] w-[48px] bg-white">
            <FontAwesomeIcon icon={faTwitter} className="text-[#54ACED]" />
          </div> */}
        </div>
        <p className="pt-3 pb-2 w-full text-center ">
          BookBazaar | Baku, Azerbaijan
          {/* 250 Executive Park Blvd, Suite 3400 <br className="md:hidden" />{" "}
          <span className="hidden md:inline">•</span> San Francisco CA 94134{" "}
          <br className="md:hidden" />{" "}
          <span className="hidden md:inline">•</span> United States */}
        </p>
        <div className=" flex flex-wrap justify-center md:justify-start gap-3 md:gap-0">
          <div className="flex gap-3 items-center">
            <FontAwesomeIcon icon={faPhone} />
            <a href="tel:+994773063702" target="_blank">
              <span className="text-[#54ACED]">+994773063702</span>
            </a>
          </div>
          <div className="flex gap-3 items-center pl-10">
            <FontAwesomeIcon icon={faEnvelope} />
            <a href="mailto:info@bookbazzar.az" target="_blank">
              <span className="text-[#54ACED]">bookbazaar.az@gmail.com</span>
            </a>
          </div>
        </div>

        <div className="flex mt-8 pb-6">
          <Image src={logoFooter} alt="" className="w-[120px]" />
        </div>
      </div>
      <Copyright />
    </footer>
  );
};
