import Layout from "@/components/Layout";
import { store, useAppDispatch } from "@/store/store";
import "@/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
// pages/_app.js
import { Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
const montserrat = Fraunces({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <style jsx global>{`
          html {
            font-family: ${montserrat.style.fontFamily};
          }
        `}</style>
        <Layout>
          <Toaster position="top-right" />
          <main className={montserrat.className}>
            <Component {...pageProps} />
          </main>
        </Layout>
      </Provider>
      <Analytics />
    </>
  );
}
