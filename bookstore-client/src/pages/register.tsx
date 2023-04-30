import { RegisterDto, authApi } from "@/store/authApi";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo } from "react";
import { set, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { convertToBase64 } from "@/utils/fileToBase64";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import error from "next/error";
import ErrorMapper from "@/components/ErrorMapper";
type Props = {};

const TeamMember = ({
  getData,
  maxCount,
}: {
  getData: (data: any) => void;
  maxCount: number;
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{
    teamMembers: {
      name: string;
      surname: string;
      email: string;
      contactNumber: string;
    };
  }>();

  const submitHandle = (data: any) => {
    console.log(data);
    getData(data.teamMembers);
  };

  return (
    <div className="flex flex-wrap gap-[30px]  w-full">
      <div className="flex flex-col gap-2 max-w-[350px] w-full">
        <label htmlFor={`teamMembers.name`}>
          <b>Player name</b>
        </label>
        <input
          {...register(`teamMembers.name`, {
            required: `Player  name is required`,
          })}
          className="border border-gray-300 rounded-md px-[6px] py-[12px] w-full"
        />
        <span className="text-red-500">
          {errors?.teamMembers && errors?.teamMembers?.name?.message}
        </span>
      </div>

      <div className="flex flex-col gap-2 max-w-[350px] w-full">
        <label htmlFor={`teamMembers.surname`}>
          <b>Player surname</b>
        </label>
        <input
          {...register(`teamMembers.surname`, {
            required: `Player  surname is required`,
          })}
          className="border border-gray-300 rounded-md px-[6px] py-[12px] w-full"
        />
        <span className="text-red-500">
          {errors?.teamMembers && errors?.teamMembers?.surname?.message}
        </span>
      </div>

      <div className="flex flex-col gap-2 max-w-[350px] w-full">
        <label htmlFor={`teamMembers.email`}>
          <b>Player email</b>
        </label>
        <input
          {...register(`teamMembers.email`, {
            required: `Player email is required`,
          })}
          className="border border-gray-300 rounded-md px-[6px] py-[12px] w-full"
        />
        <span className="text-red-500">
          {errors?.teamMembers && errors?.teamMembers.email?.message}
        </span>
      </div>

      <div className="flex flex-col gap-2 max-w-[350px] w-full">
        <label htmlFor={`teamMembers.contactNumber`}>
          <b>Player contact number</b>
        </label>
        <input
          {...register(`teamMembers.contactNumber`, {
            required: `Player contact number is required`,
          })}
          className="border border-gray-300 rounded-md px-[6px] py-[12px] w-full"
        />
        <span className="text-red-500">
          {errors?.teamMembers && errors?.teamMembers.contactNumber?.message}
        </span>
      </div>

      <div className="w-full">
        <button
          type="button"
          className="border border-gray-300 rounded-md px-[2px] py-[2px] text-xs"
          onClick={handleSubmit(submitHandle)}
        >
          Add Player
        </button>
      </div>
    </div>
  );
};

export const registerSchema = yup.object().shape({
  // name: yup.string().label("Name").required(),
  // surname: yup.string().label("Surname").required(),
  // fathername: yup.string().label("Fathername").required(),
  // email: yup.string().email().label("Email").required(),
  // gender: yup.string().label("Gender").required(),
  // birthday: yup.string().label("Birthday").required(),
  // howLearnAboutUs: yup.string().label("HowLearnAboutUs").required(),
  // shirtSize: yup.string().label("ShirtSize").required(),
  // photo: yup.string().label("Photo").required(),
  // schoolLogo: yup.string().label("SchoolLogo").required(),
  // teamLogo: yup.string().label("TeamLogo").required(),
  // jerseySize: yup.string().label("JerseySize").required(),
  // jerseyNumber: yup.string().label("JerseyNumber").required(),
  // approvesTermsAndConditions: yup
  //   .string()
  //   .label("ApprovesTermsAndConditions")
  //   .required(),
  // areYourUniPayment: yup.string().label("AreYourUniPayment").required(),
  // comments: yup.string().label("Comments").required(),
});

const leagues: {
  [key: string]: {
    id: number;
    name: string;
  }[];
} = {
  soccer6v6: [
    { id: 1, name: "U16" },
    { id: 2, name: "U18" },
    { id: 3, name: "U21" },
    { id: 4, name: "GIRLS" },
  ],
  basketball3x3: [
    { id: 8, name: "RECREATIONAL" },
    { id: 7, name: "U21" },
  ],
  beachVolleyball4v4: [
    { id: 5, name: "RECREATIONAL" },
    { id: 6, name: "U21" },
  ],
};

export default function Register(props: Props) {
  const router = useRouter();
  const params = router.query;
  const { sport: sportParam, league: leagueParam } = params;
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const [
    registerApi,
    {
      isLoading: isRegisterLoading,
      isError: isRegisterError,
      isSuccess: isRegisterSuccess,
      data: RegisterData,
      error: RegisterError,
    },
  ] = authApi.useRegisterMutation();

  const methods = useForm<any>({});

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    setValue,
  } = methods;

  const onSubmit = async (data: any) => {
    try {
      await registerApi({
        name: data.name,
        email: data.email,
        password: data.password,
      }).unwrap();
      toast.success("Register success");
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong");
    }
    return null;
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
            Register <span className="text-[#F05726]">for your account</span>
          </h1>

          <p className="w-full text-base  pb-3 text-gray-500">
            The BookBazaar team wishes you the best of luck with your
            registration process and we are looking forward to seeing you as
            much as possible for contribution!
          </p>
          {/* Username */}
          <div className="flex flex-col gap-2  w-full">
            <label htmlFor="username">
              <b> Username</b>
            </label>
            <input
              type="name"
              {...register("name", {
                required: "Username is required",
              })}
              className="border border-gray-300 rounded-md px-[6px] py-[12px]"
              placeholder="Username"
            />
            <span className="text-red-500">{errors.name?.message}</span>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2  w-full">
            <label htmlFor="email">
              <b> Email</b>
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              className="border border-gray-300 rounded-md px-[6px] py-[12px]"
              placeholder="Email"
            />
            <span className="text-red-500">{errors.email?.message}</span>
          </div>
          {/* Password */}
          <div className="flex flex-col gap-2  w-full">
            <label htmlFor="password">
              <b> Password</b>
            </label>
            <input
              minLength={13}
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              className="border border-gray-300 rounded-md px-[6px] py-[12px]"
              placeholder="Password"
            />
            <span className="text-red-500">{errors.password?.message}</span>
          </div>

          {/* Terms and conditions */}
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="termsAndConditions"
              className="termsAndConditions flex gap-2"
            >
              <span className="text-blue-500 ">
                <a
                  target="_blank"
                  href="https://www.termsandcondiitionssample.com/"
                  className="text-blue-500 underline"
                >
                  Terms and conditions
                </a>
              </span>
              <input
                type="checkbox"
                {...register("termsAndConditions", {
                  required: "You must agree to the terms and conditions",
                })}
              />
            </label>

            <span className="text-red-500">
              {errors.termsAndConditions?.message}
            </span>
          </div>

          {/* Submit */}
          <div className="w-full flex justify-end">
            <button
              type="submit"
              className="h-[50px] bg-[#032974] text-white px-[6px] py-[12px] rounded-md w-full"
            >
              Submit{" "}
              {isRegisterLoading && <span className="animate-spin">...</span>}
            </button>
          </div>

          {isRegisterSuccess && (
            <div>
              <div className="text-green-500">
                Your account has been created successfully
              </div>
              {/* <div className="text-green-500">
                Please check your email to verify your account
              </div> */}
            </div>
          )}

          <ErrorMapper error={RegisterError} />
        </form>
      </div>
    </div>
  );
}
