import Container from "@/components/Container";
import { AppProps } from "next/app";
import aboutBg from "@/media/images/about.jpg";
import bookCollection from "@/media/images/books-collection.jpg";

export default function About({ Component, pageProps }: AppProps) {
  return (
    <div className="mx-auto">
      <div
        className="bg-[#00000093] h-[250px] flex justify-center items-center relative"
        style={{
          backgroundImage: `url(${aboutBg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full h-full top-0 left-0 absolute bg-[#00000093] z-10"></div>
        <h1 className="text-4xl text-white z-20">About Us</h1>
      </div>
      <Container>
        <div className="mx-auto flex flex-wrap max-w-[1140px] px-[15px] gap-20 pt-20 pb-20">
          <div className="flex flex-col max-w-[600px] justify-start items-start w-full gap-3 pt-5">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold">Our mission</h2>
              <p className="font-extralight text-gray-500">
                Our mission is to foster a love for reading and make books more
                accessible for everyone in Azerbaijan. We aim to create a
                sustainable platform that contributes to a circular economy by
                giving second-hand books a new life. Through our platform, we
                hope to encourage sharing and exchanging of books, reducing
                waste and promoting literacy in the process. We strive to create
                a thriving community of readers, authors, and publishers, where
                everyone can find, share, and discuss their favorite books.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold">What We Are</h2>
              <p className="font-extralight  text-gray-500"></p>
              <p className=" text-gray-500">
                We are a team of passionate book lovers who believe in the power
                of reading to transform lives. Recognizing the need for an
                affordable and easy-to-use platform for buying and selling
                second-hand books in Azerbaijan, we created [Your Platform's
                Name]. Our team is committed to providing a seamless and
                enjoyable experience for all users, whether you're looking to
                declutter your bookshelf, find your next great read, or connect
                with fellow readers. We understand the importance of trust in
                our community, which is why we prioritize transparency and
                customer service in everything we do. We're more than just a
                platform - we're a community that celebrates literature and the
                joy of reading.
                <br />
                <br />
                These sections are a great opportunity to connect with your
                users on a deeper level. Be sure to highlight your values, your
                commitment to your users, and the unique aspects of your
                platform.
              </p>
            </div>
          </div>

          <img
            src={bookCollection.src}
            alt=""
            className="max-h-[380px] w-auto shadow-xl rounded-md"
          />
        </div>
      </Container>
    </div>
  );
}
