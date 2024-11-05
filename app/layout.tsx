'use client';

import Sidebar from "@components/Sidebar";
import '@sass/styles/main.scss';
import { Public_Sans } from "next/font/google";
import { TransactionProvider } from "@context/RecurBillsContext";
import { usePathname } from "next/navigation";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const excludeSidebarRoutes = ["/signup", "/login"];

  const shouldShowSidebar = !excludeSidebarRoutes.includes(path);
  return (
    <html lang="en">
      <body className={publicSans.className}>
        <TransactionProvider>
          <div className={shouldShowSidebar ? 'layout' : 'auth'}>
            {shouldShowSidebar && <Sidebar />}
            <main>
              {children}
            </main>
          </div>
        </TransactionProvider>
      </body>
    </html>
  );
}
