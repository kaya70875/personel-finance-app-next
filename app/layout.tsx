import Sidebar from "@components/Sidebar";
import '@sass/styles/main.scss';
import { Public_Sans } from "next/font/google";
import { TransactionProvider } from "@context/RecurBillsContext";
import { getServerSession } from "next-auth";
import SessionProvider from "@providers/SessionProvider";
import { useRouter } from "next/router";
const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={publicSans.className}>
        <SessionProvider session={session}>
          <TransactionProvider>
            <div className={session ? 'layout' : 'auth'}>
              {session && <Sidebar />}
              <main>
                {children}
              </main>
            </div>
          </TransactionProvider>
        </SessionProvider>

      </body>
    </html>
  );
}
