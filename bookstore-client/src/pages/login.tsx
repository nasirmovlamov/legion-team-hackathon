import Link from "next/link";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { authApi } from "@/store/authApi";
import router from "next/router";
import { teamApi } from "@/store/teamApi";
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

  const [backendErrors, setBackendErrors] = React.useState<any>(null);
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
      await loginApi(data)
        .unwrap()
        .then(async (res) => {
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          localStorage.setItem("token", res.accessToken);
        });
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const loginErrorData = useMemo(() => {
    if (isLoginError) {
      return loginError as any;
    }
    return null;
  }, [isLoginError, loginError]);

  return (
    <div className="flex justify-center pt-[50px] pb-[50px]">
      <div className="flex max-w-[1230px] justify-center w-full">
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 max-w-[400px] w-full"
        >
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
            className="bg-[#032974] text-white px-[6px] py-[12px] rounded-md"
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

          <div>
            {loginError &&
              ("status" in loginError ? (
                <div>
                  <div>
                    {loginErrorData?.data &&
                      Object.keys(loginErrorData.data).map((key) => {
                        key !== "statusCode" && (
                          <p key={key} className="text-red-500">
                            {loginErrorData.data[key]}
                          </p>
                        );
                      })}
                  </div>
                </div>
              ) : null)}
          </div>
        </form>
      </div>
    </div>
  );
}
