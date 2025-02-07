import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";
import CommonLayout from "@/components/common-layout";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Job Portal for Job Seekers - Recruiter's",
  description: "A modern job portal application built with Next.js, offering a seamless experience for job seekers and employers. This platform enables users to post jobs, search for opportunities, and manage their job applications efficiently.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <Suspense fallback={<Loading />}>
            <CommonLayout children={children} />
            <Toaster />
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}
