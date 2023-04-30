import Container from "@/components/Container";
import { booksApi } from "@/store/booksApi";
import error from "next/error";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {};

const Profile = (props: Props) => {
  const [roles, setRoles] = useState<any[]>([]);

  const {
    data: booksData,
    isLoading: booksLoading,
    isError: isBooksError,
    error: booksError,
  } = booksApi.useGetBooksQuery({});

  const [
    confirmApi,
    {
      isLoading: confirmLoading,
      isError: isConfirmError,
      isSuccess: confirmSuccess,
      data: confirmData,
    },
  ] = booksApi.useConfirmBookMutation();

  useEffect(() => {
    setRoles(JSON.parse(localStorage.getItem("user")!).roles);
  }, []);

  const hasRole = (role: string) => {
    return roles.some((r) => r.name === role);
  };

  const confirmBook = async (id: string) => {
    try {
      const res = await confirmApi({ id }).unwrap();
      toast.success("Book has been confirmed successfully");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };

  return (
    <Container>
      <div className="pt-[50px] pb-[50px] uppercase">
        {/* User Roles
        {hasRole("admin") && (
          <div>
            <h1>Admin</h1>
          </div>
        )} */}
        {hasRole("admin") && (
          <div className="mx-auto">
            <h1 className="text-[35px]">Books for confirmation</h1>
            <div>
              {booksData?.map(
                (book: any) =>
                  !book.isConfirmed && (
                    <div
                      key={book.id}
                      className="flex p-5 m-2 shadow-md flex-col gap-3"
                    >
                      <h1>{book.title}</h1>
                      <Link
                        href={`/books/${book.id}`}
                        className="bg-blue-500 text-white py-1 px-1 rounded-md w-max"
                      >
                        More Details
                      </Link>
                      <button
                        onClick={() => confirmBook(book.id)}
                        className="bg-green-500 text-white py-1 px-1 rounded-md w-max"
                      >
                        Confirm
                      </button>
                    </div>
                  )
              )}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Profile;
