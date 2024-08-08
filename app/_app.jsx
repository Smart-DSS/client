// /app/_app.js

import "../styles/globals.css";
import { ShelterProvider } from "@/context/ShelterContext";

function MyApp({ Component, pageProps }) {
  return (
    <ShelterProvider>
      <Component {...pageProps} />
    </ShelterProvider>
  );
}

export default MyApp;
