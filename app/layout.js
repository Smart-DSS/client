import { Inter } from "next/font/google";
import "./globals.css";
import Authprovider from "@/components/Authprovider/Authprovider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NIRNAI",
  description: "Smart DSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Authprovider>{children}</Authprovider>
      </body>
    </html>
  );
}
