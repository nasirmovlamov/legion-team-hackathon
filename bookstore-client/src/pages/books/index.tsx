import Container from "@/components/Container";
import { faBook, faDollar, faDonate, faExchange, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type Props = {};

const Books = (props: Props) => {
  const [selection, setSelection] = React.useState(1);

  return (
    <div>
      <Container>
        <div className="flex flex-col gap-2">
          {selection === 1 && (
            <div className="text-[#3D5C6D] text-[45px] pt-[15px] text-center pb-5 max-w-[500px] w-full mx-auto">
              Buy and sell your books at the{" "}
              <span className="text-[#F05726]">best price</span>
            </div>
          )}
          {selection === 2 && (
            <div className="text-[#3D5C6D] text-[45px] pt-[15px] text-center pb-5 max-w-[500px] w-full mx-auto">
              Buy your books at the best price{" "}
              <span className="text-[#F05726]">best price</span>
            </div>
          )}
          {selection === 3 && (
            <div className="text-[#3D5C6D] text-[45px] pt-[15px] text-center pb-5 max-w-[500px] w-full mx-auto">
              Swap your books and{" "}
              <span className="text-[#F05726]">enjoy reading</span>
            </div>
          )}
          {selection === 4 && (
            <div className="text-[#3D5C6D] text-[45px] pt-[15px] text-center pb-5 max-w-[500px] w-full mx-auto">
              Donate your books for{" "}
              <span className="text-[#F05726]">a good cause</span>
            </div>
          )}
          <div className="flex flex-wrap justify-center">
            <button
              onClick={() => setSelection(1)}
              className={
                " max-w-[200px] w-full   px-8 py-3 " +
                (selection === 1
                  ? "bg-[#F05726] text-white"
                  : "bg-transparent border border-gray-500 text-gray-500 ")
              }
            >
              <FontAwesomeIcon icon={faDollar} className="mr-2" />
              <span>Sell</span>
            </button>
            <button
              onClick={() => setSelection(2)}
              className={
                " max-w-[200px] w-full   px-8 py-3 " +
                (selection === 2
                  ? "bg-[#F05726] text-white"
                  : "bg-transparent border border-gray-500 text-gray-500")
              }
            >
              <FontAwesomeIcon icon={faBook} className="mr-2" />
              <span>Buy</span>
            </button>
            <button
              onClick={() => setSelection(3)}
              className={
                " max-w-[200px] w-full   px-8 py-3 " +
                (selection === 3
                  ? "bg-[#F05726] text-white"
                  : "bg-transparent border border-gray-500 text-gray-500")
              }
            >
              <FontAwesomeIcon icon={faExchange} className="mr-2" />
              <span>Swap</span>
            </button>
            <button
              onClick={() => setSelection(4)}
              className={
                " max-w-[200px] w-full   px-8 py-3 " +
                (selection === 4
                  ? "bg-[#F05726] text-white"
                  : "bg-transparent border border-gray-500 text-gray-500")
              }
            >
              <FontAwesomeIcon icon={faDonate} className="mr-2" />
              <span>Donate</span>
            </button>
          </div>
        </div>

        <div className="max-w-[700px] w-full flex pt-10 mx-auto">
          {/* search section */}
          <div className="h-[55px] items-center flex  bg-white border border-gray-500  w-full overflow-hidden">
            <FontAwesomeIcon
              icon={faSearch}
              className="p-3 text-gray-500"
              size="xl"
            />
            <input
              type="text"
              placeholder="Search for the ISBN number..."
              className="w-full px-1 py-2 outline-none"
            />
          </div>
          <button className="bg-[#F05726] text-white px-8 py-3 w-max text-[20px]">
            SCOUT
          </button>
        </div>
      </Container>
    </div>
  );
};

export default Books;
