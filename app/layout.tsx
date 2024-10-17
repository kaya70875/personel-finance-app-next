import Sidebar from "@components/Sidebar";
import type { Metadata } from "next";
import '@sass/styles/main.scss';

export const metadata: Metadata = {
  title: "FinanceG",
  description: "Personalized finance app for your financial goals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
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
