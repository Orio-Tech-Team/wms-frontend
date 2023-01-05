import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/Layout/Layout";
import { useRouter } from "next/router";
import "../assets/base.scss";
import { RecoilRoot } from "recoil";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
//

//
function MyApp({ Component, pageProps }) {
  const route = useRouter();

  //
  //
  if (route.pathname === "/login") {
    return <Component {...pageProps} />;
  }
  if (route.pathname.includes("/invoice")) {
    return (
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    );
  }
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}

export default MyApp;
