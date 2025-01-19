import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import { ThemeProvider } from "@/context/theme-provider";
import { TaskProvider } from "@/context/task-provider";

const urbanist = Urbanist({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Organiz.",
  description: "Manage tasks with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={urbanist.className}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TaskProvider>
            <Navbar />
            {children}
          </TaskProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
