import Link from "next/link";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import router from "next/router";
import ErrorMapper from "@/components/ErrorMapper";
import { loginSchema } from "../login";
import { booksApi } from "@/store/booksApi";
type Props = {};

export type CreateBookDto = {
  title: string;

  description: string;

  author: string;

  publisher: string;

  isbn: string;

  price: string;

  isDonation: boolean;

  condition: string;
};

export default function Submit(props: Props) {
  const [
    createBookApi,
    {
      isLoading: createBookLoading,
      isError: isCreateBookError,
      isSuccess: createBookSuccess,
      data: createBookData,
      error: createBookError,
    },
  ] = booksApi.useCreateBookMutation();

  const methods = useForm<CreateBookDto>();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = methods;

  const onSubmit = async (data: CreateBookDto) => {
    try {
      console.log(data);
      const res = await createBookApi({
        ...data,
        isDonation: Boolean(data.isDonation),
      }).unwrap();
      toast.success("Book has been submitted successfully");
    } catch (error: any) {
      console.log(error);
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
            Submit <span className="text-[#F05726]">your book</span>
          </h1>
          <div className="flex flex-col gap-2">
            <label htmlFor="title">
              <b> Title</b>
            </label>
            <input
              type="title"
              {...register("title", { required: true })}
              className="border border-gray-300 rounded-md px-[6px] py-[12px]"
              placeholder="Enter book title"
            />
            <span className="text-red-500">{errors.title?.message}</span>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description">
              <b> Description</b>
            </label>
            <input
              type="description"
              {...register("description", { required: true })}
              className="border border-gray-300 rounded-md px-[6px] py-[12px]"
              placeholder="Enter book description"
            />
            <span className="text-red-500">{errors.description?.message}</span>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="author">
              <b> Author</b>
            </label>
            <input
              type="author"
              {...register("author", { required: true })}
              className="border border-gray-300 rounded-md px-[6px] py-[12px]"
              placeholder="Enter book author"
            />
            <span className="text-red-500">{errors.author?.message}</span>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="publisher">
              <b> Publisher</b>
            </label>
            <input
              type="publisher"
              {...register("publisher", { required: true })}
              className="border border-gray-300 rounded-md px-[6px] py-[12px]"
              placeholder="Enter book publisher"
            />
            <span className="text-red-500">{errors.publisher?.message}</span>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="isbn">
              <b> ISBN</b>
            </label>
            <input
              type="isbn"
              {...register("isbn", { required: true })}
              className="border border-gray-300 rounded-md px-[6px] py-[12px]"
              placeholder="Enter book isbn"
            />
            <span className="text-red-500">{errors.isbn?.message}</span>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="price">
              <b> Price</b>
            </label>
            <input
              type="price"
              {...register("price", { required: true })}
              className="border border-gray-300 rounded-md px-[6px] py-[12px]"
              placeholder="Enter book price"
            />
            <span className="text-red-500">{errors.price?.message}</span>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="condition">
              <b> Condition</b>
            </label>
            <input
              type="condition"
              {...register("condition", { required: true })}
              className="border border-gray-300 rounded-md px-[6px] py-[12px]"
              placeholder="Enter book condition"
            />
            <span className="text-red-500">{errors.price?.message}</span>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="isDonation">
              <b> Donation</b>
            </label>
            <select
              {...register("isDonation", { required: true })}
              className="border border-gray-300 rounded-md px-[6px] py-[12px]"
              placeholder="Enter book condition"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <span className="text-red-500">{errors.price?.message}</span>
          </div>

          <button
            type="submit"
            className="bg-[#F05726] text-white px-[6px] py-[12px] rounded-md"
          >
            Submit{" "}
            {createBookLoading && <span className="animate-spin">...</span>}
          </button>

          <ErrorMapper error={createBookError} />
        </form>
      </div>
    </div>
  );
}
