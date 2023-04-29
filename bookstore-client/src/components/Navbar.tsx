import Image from "next/image";
import Link from "next/link";
import goalPlusLogo from "../media/images/bookbazzarlogo.png";
import navLogo from "../media/images/bookbazzarlogo.png";
import StyledLink from "./StyledLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCheck,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { authSlice } from "@/store/authSlice";
import { authApi } from "@/store/authApi";
import { teamApi } from "@/store/teamApi";
import {
  useScrollPosition,
  useScrollXPosition,
  useScrollYPosition,
} from "react-use-scroll-position";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const userJwt = useAppSelector((state) => state.auth.jwt);
  const [isOpenMobileNavbar, setIsOpenMobileNavbar] = useState(false);
  const router = useRouter();
  const handleOpenMobileNavbar = () => {
    setIsOpenMobileNavbar(!isOpenMobileNavbar);
  };
  const scrollY = useScrollYPosition();

  const [
    meApi,
    {
      isLoading: meLoading,
      isError: isMeError,
      isSuccess: meSuccess,
      data: meData,
      error: meError,
    },
  ] = authApi.useLazyMeQuery();
  const [
    playersUserInfoApi,
    {
      isLoading: playersUserInfoLoading,
      isError: isPlayersUserInfoError,
      isSuccess: playersUserInfoSuccess,
      data: playersUserInfoData,
      error: playersUserInfoError,
    },
  ] = teamApi.useLazyPlayersUserInfoQuery();

  const logoutUser = () => {
    dispatch(authSlice.actions.logoutUser());
    router.push("/");
  };

  const handleToProfile = async () => {
    if (userJwt) {
      router.push("/profile");
    } else {
      router.push("/login");
    }
  };

  return (
    <>
      {/* Mobile Sidebar */}
      <div>
        <div
          className={
            "w-full h-full bg-[rgba(0,0,0,0.5)] fixed top-[0px] left-[0px] z-[2001]" +
            `${isOpenMobileNavbar ? " translate-x-0" : " -translate-x-full"}`
          }
        ></div>
        <div
          className={
            " flex flex-col w-[75%] h-full bg-white z-[2002] fixed top-[0px] left-[0px] transition-all shadow-md" +
            `${isOpenMobileNavbar ? " translate-x-0" : " -translate-x-full"}`
          }
        >
          <div className="flex justify-end h-[56px] px-[15px] py-[8px]">
            <button onClick={handleOpenMobileNavbar}>
              <span className="text-[30px] text-[rgb(115,115,115)]">×</span>
            </button>
          </div>
          <ul className="flex flex-col pl-6 text-[rgb(115,115,115)]">
            {userJwt && (
              <li className="p-2">
                <span>
                  You are logged <FontAwesomeIcon icon={faCheck} />
                </span>
              </li>
            )}
            {!userJwt && (
              <li className="p-2">
                <StyledLink href="/register">Register</StyledLink>
              </li>
            )}

            {!userJwt && (
              <li className="p-2">
                <StyledLink href="/login">Login</StyledLink>
              </li>
            )}

            <li className="p-2">
              <StyledLink href="/sports-leagues">Sports leagues</StyledLink>
            </li>
            <li className="p-2">
              <a href="https://www.instagram.com/goalplusaz/" target="_blank">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>

      <header
        className={
          "w-full sticky top-[0px] flex justify-center  bg-[#F9FFFF] z-[1000] py-2" +
          ` ${scrollY > 50 ? "shadow-md" : ""}`
        }
      >
        <nav className="h-[56px] flex w-full max-w-[1140px] px-[15px] py-[8px] justify-between">
          <div className="flex md:hidden">
            <Link href="/">
              <Image src={navLogo} alt="logo" className="w-[40px] h-[40px]" />
            </Link>
          </div>
          <div className="md:flex hidden">
            <Link href="/">
              <Image src={navLogo} alt="logo" className="w-[100px] mt-1" />
            </Link>
            <ul className="flex pl-6 text-[rgb(115,115,115)]">
              {/* <li className="p-2">
                <StyledLink href="/pricing">Community Pass</StyledLink>
              </li>
              <li className="p-2">
                <StyledLink href="/help">Help</StyledLink>
              </li> */}
            </ul>
          </div>

          <ul className="md:flex h-[40px] items-center hidden ">
            {userJwt && (
              <button onClick={() => handleToProfile()} className="flex gap-3">
                <li className="pl-5 pr-3 flex gap-2 items-center text-gray-600 text-md">
                  <svg
                    className=" inline-block h-6 w-6 stroke-black stroke-2 stroke-skin-dark"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 20v-1a7 7 0 017-7v0a7 7 0 017 7v1M12 12a4 4 0 100-8 4 4 0 000 8z"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                  <span> Account</span>
                </li>
              </button>
            )}
            {userJwt && (
              <li className="pl-4 pr-3 bg-[#032974] text-white rounded-md px-4 py-[6px] hover:bg-[#0a3b9d] transition duration-300 ease-in-out">
                <button onClick={logoutUser} className="m-0 p-0">
                  Logout
                </button>
              </li>
            )}
            {!userJwt && (
              <li className="pl-4 pr-3">
                <Link
                  href="/login"
                  className={
                    " max-w-[200px] w-full   px-8 py-2 bg-transparent border border-gray-500 text-gray-500"
                  }
                >
                  Login
                </Link>
              </li>
            )}
            {!userJwt && (
              <li className="pl-1 pr-3">
                <Link
                  href="/login"
                  className={
                    " max-w-[200px] w-full   px-8 py-[9px] bg-[#F05726] text-white"
                  }
                >
                  Sign Up
                </Link>
              </li>
            )}
          </ul>

          <div className="flex gap-3 md:hidden">
            {userJwt && (
              <button
                onClick={() => handleToProfile()}
                // gray background
                className="flex gap-3 md:hidden bg-[#f2f2f2] rounded-md px-4 py-[6px] hover:bg-[#e6e6e6] transition duration-300 ease-in-out shadow-md items-center justify-center h-[40px] w-[40px]"
              >
                <FontAwesomeIcon icon={faUser} />
              </button>
            )}

            <div className="md:hidden">
              <button
                onClick={handleOpenMobileNavbar}
                className="md:hidden flex items-center justify-center h-[40px] w-[40px] rounded-md bg-[#032974] text-white shadow-lg"
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
