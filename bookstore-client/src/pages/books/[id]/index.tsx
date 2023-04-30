import Container from "@/components/Container";
import { booksApiOpenLibrary } from "@/store/bookApiOpenLibrary";
import { booksApi } from "@/store/booksApi";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

type Props = {};

const SingleBook = (props: Props) => {
  const router = useRouter();
  const [
    getBookApi,
    {
      data: bookData,
      isLoading: bookLoading,
      isError: isBookError,
      error: bookError,
      isSuccess: isGetBookSuccess,
    },
  ] = booksApi.useLazyGetBookQuery();

  const [
    getBookOpenLibraryApi,
    {
      data: bookOpenLibraryData,
      isLoading: bookOpenLibraryLoading,
      isError: isBookOpenLibraryError,
      error: bookOpenLibraryError,
    },
  ] = booksApiOpenLibrary.useLazyGetBookOpenLibraryISBNQuery();

  useEffect(() => {
    if (router.isReady) {
      getBookApi({ id: router.query.id as string });
    }
  }, [router.isReady]);

  useEffect(() => {
    if (isGetBookSuccess) {
      getBookOpenLibraryApi({ isbn: bookData?.isbn });
    }
  }, [isGetBookSuccess]);

  if (bookLoading) {
    return null;
  }
  return (
    <Container>
      <div className="flex justify-center mt-20">
        <img
          className="w-[200px] h-[300px] object-cover shadow-lg"
          src={`https://covers.openlibrary.org/b/id/${bookOpenLibraryData?.covers[0]}-L.jpg`}
          alt=""
        />
        <div className="mt-4 ml-5 flex flex-col gap-2">
          <h1 className="text-[40px]"> {bookData?.title}</h1>
          <p className="text-[20px] text-gray-500"> {bookData?.publisher}</p>
          <p className="text-[20px] text-gray-500"> {bookData?.description}</p>
          <p className="text-[20px] text-gray-500"> {bookData?.condition}</p>
          <p className="text-[20px] text-gray-500">ISBN: {bookData?.isbn}</p>
          <p className="text-[30px] text-[#F05726]">{bookData?.price} AZN</p>
        </div>
      </div>
    </Container>
  );
};

export default SingleBook;
