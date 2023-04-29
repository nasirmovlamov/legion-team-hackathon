import Container from "@/components/Container";
import { AppProps } from "next/app";
import aboutBg from "@/media/images/about.jpg";
import bookCollection from "@/media/images/books-collection.jpg";
import { useRef, FormEvent } from "react";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
import heroImage from "@/media/images/hero.svg";

export default function Contact({ Component, pageProps }: AppProps) {
  const form = useRef<any>();
  const sendEmail = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await emailjs.sendForm(
        "service_egv16sb",
        "template_3ufx3pa",
        form.current,
        "WqPLqkBrNev1VZABc"
      );
      toast.success("Message sent successfully");
    } catch (error) {
      console.error(error);
      // toast.error("Something went wrong");
    }
  };

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
        <h1 className="text-4xl text-white z-20">Contact Us</h1>
      </div>
      <Container>
        <div className="relative mx-auto flex flex-wrap max-w-[1140px] px-[15px] gap-20 pt-10 pb-40">
          <form
            ref={form}
            onSubmit={sendEmail}
            // make glassmorphism
            className="flex flex-col gap-5 w-full  p-5 rounded-lg bg-white shadow-lg relative z-10 "
          >
            <h2 className="text-center text-[25px]"> Send us a message</h2>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-xl font-bold">
                Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="Your name"
                className="border border-gray-200 rounded-md p-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-xl font-bold">
                Email
              </label>
              <input
                name="email"
                type="text"
                placeholder="Your email"
                className="border border-gray-200 rounded-md p-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-xl font-bold">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder="Your email"
                className="border border-gray-200 rounded-md p-2 w-full"
              />
            </div>
            <button className="bg-[#54ACED] text-white font-bold text-xl rounded-md p-2">
              Send
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}
