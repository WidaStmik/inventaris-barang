import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import Layout from "@/layout";
import { store } from "@/redux";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Toaster />
    </Provider>
  );
}
