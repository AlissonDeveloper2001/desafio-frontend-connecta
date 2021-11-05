import React from "react";
// import { AuthProvider } from "../hooks/useAuth";
import "../styles/index.css";

function MyApp({ Component, pageProps }) {
  return (
    // <AuthProvider>
    <Component {...pageProps} />
    // </AuthProvider>
  );
}

export default MyApp;
