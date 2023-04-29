import Container from "@/components/Container";
import cafeBook from "@/media/images/cafe-book.png";
import Link from "next/link";

export default function Home() {
  return (
    <Container>
      <div className="relative py-[56px]">
        <div className="flex gap-y-8 flex-col max-w-[536px]">
          <h1 className="text-[60px] leading-tight font-bold">
            Best Place to Find Your Favourite Books.
          </h1>
          <p className="text-[18px] leading-[28px] text-gray-500">
            Unleash your imagination with our online bookstore! Discover a vast
            selection of books for all ages and interests, with something for
            everyone. Shop now and find your next favorite read!
          </p>
          <Link
            href={"/books"}
            className="bg-[#54ACED] text-white px-8 py-3 w-max rounded-md"
          >
            Browse books
          </Link>
          <p className="text-md leading-[28px] text-gray-500 gap-4 flex">
            <span> Swap books</span> <span>|</span> <span> Enjoy reading</span>
            <span>|</span> <span>Save money</span>
          </p>
        </div>

        <img
          src={cafeBook.src}
          alt="cafe book"
          // drop-shadow(0 35px 35px rgba(0,0,0,.4))
          className="absolute right-0 top-10 max-w-[536px] -z-10 drop-shadow-2xl"
        />
      </div>
    </Container>
  );
}
