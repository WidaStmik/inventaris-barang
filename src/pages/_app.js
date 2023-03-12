import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import Layout from "@/layout";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Toaster />
    </>
  );
}
