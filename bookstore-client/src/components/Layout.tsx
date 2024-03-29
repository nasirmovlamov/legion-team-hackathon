import { ScriptProps } from "next/script";
import React, { useEffect } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import Copyright from "./Copyright";
import { authSlice } from "@/store/authSlice";
import { useAppDispatch } from "@/store/store";
import { useRouter } from "next/router";
import TopNav from "./TopNav";
import { authApi } from "@/store/authApi";

export default function Layout({ children }: ScriptProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [
    meApi,
    {
      isLoading: meLoading,
      isError: isMeError,
      isSuccess: meSuccess,
      data: meData,
    },
  ] = authApi.useLazyMeQuery();

  useEffect(() => {
    if (
      localStorage.getItem("accessToken") &&
      localStorage.getItem("refreshToken")
    ) {
      meApi();
    }
  }, []);

  return (
    <div className="min-h-screen">
      <div className="min-h-[calc(100vh-310px)]">
        <TopNav />
        <Navbar />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
