import Link from "next/link";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { authApi } from "@/store/authApi";
import router from "next/router";
import ErrorMapper from "@/components/ErrorMapper";
type Props = {};

export type LoginDto = {
  email: string;
  password: string;
};

export const loginSchema = yup.object().shape({
  email: yup.string().email().label("Email").required(),
  password: yup.string().label("Password").required(),
});

export default function Login(props: Props) {
  const [
    loginApi,
    {
      isLoading: loginLoading,
      isError: isLoginError,
      isSuccess: loginSuccess,
      data: loginData,
      error: loginError,
    },
  ] = authApi.useLoginMutation();

  const methods = useForm<LoginDto>({
    resolver: yupResolver(loginSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = methods;

  const onSubmit = async (data: LoginDto) => {
    try {
      const res = await loginApi(data).unwrap();
      toast.success("You are logged in");
      router.push("/");
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="flex justify-center pt-[50px] pb-[50px]">
      <div className="flex max-w-[1230px] justify-center w-full">
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 max-w-[500px] w-full bg-white p-10 rounded-md shadow-md"
        >
          <h1 className="text-center text-[#032974] text-2xl font-bold">
            Sign in to <span className="text-[#F05726]">your account</span>
          </h1>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">
              <b> Email</b>
            </label>
            <input
              type="email"
              {...register("email")}
              className="border border-gray-300 rounded-md px-[6px] py-[12px]"
              placeholder="Email"
            />
            <span className="text-red-500">{errors.email?.message}</span>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">
              <b> Password</b>
            </label>
            <input
              type="password"
              {...register("password")}
              className="border border-gray-300 rounded-md px-[6px] py-[12px]"
              placeholder="Password"
            />
            <span className="text-red-500">{errors.password?.message}</span>
          </div>
          <button
            type="submit"
            className="bg-[#F05726] text-white px-[6px] py-[12px] rounded-md"
          >
            Login {loginLoading && <span className="animate-spin">...</span>}
          </button>

          {/* Don't have account */}
          <div className="flex justify-between">
            <Link href="/register" className="text-[#032974]">
              I don&apos;t have an account
            </Link>
            <Link href="/forgetpassword" className="text-[#032974]">
              Forget Password ?
            </Link>
          </div>

          <ErrorMapper error={loginError} />
        </form>
      </div>
    </div>
  );
}
