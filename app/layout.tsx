import Sidebar from "@components/Sidebar";
import type { Metadata } from "next";
import '@sass/styles/main.scss';

import { Public_Sans } from "next/font/google";
import insertToDatabase from "@utils/insertToDatabase";

export const metadata: Metadata = {
  title: "FinanceG",
  description: "Personalized finance app for your financial goals",
};

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={publicSans.className}>
        <div className="layout">
          <Sidebar />
          <main>
            {children}
          </main>
        </div>
        
      </body>
    </html>
  );
}
