import { CreateBookDto } from "@/pages/books/submit";
import Link from "next/link";
import React from "react";

type Props = {
  book: any;
};

const DonationBookCard = ({ book }: Props) => {
  if (!book.isConfirmed) {
    return null;
  }
  return (
    <Link href={`/books/${book.id}`}>
      <div className="flex flex-wrap gap-2 w-[250px]  shadow-md bg-white p-4 rounded-md">
        <h5 className="flex w-full flex-col gap-2 text-xs">{book.title}</h5>
        {book.isDonation && (
          <div
            className="flex  gap-2 text-xs self-end bg-[#F05726] text-white rounded-md px-2 py-1
        "
          >
            Donation
          </div>
        )}
      </div>
    </Link>
  );
};

export default DonationBookCard;
