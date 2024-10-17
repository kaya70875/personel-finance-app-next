import type { Metadata } from "next";

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
        {children}
      </body>
    </html>
  );
}
