import Link from "next/link";
import React from "react";

type Props = {};

const TopNav = (props: Props) => {
  return (
    <div className="bg-[#ECF4F4]">
      <div className="px-[15px] max-w-[1140px] h-[24px] w-full mx-auto flex gap-4 items-center text-xs text-gray-500">
        <Link href="/about" className="hover:underline hover:text-gray-600">
          About us
        </Link>
        <Link href="/contact" className="hover:underline hover:text-gray-600">
          Contact
        </Link>
        <Link href="/team" className="hover:underline hover:text-gray-600">
          Our Team
        </Link>
      </div>
    </div>
  );
};

export default TopNav;
