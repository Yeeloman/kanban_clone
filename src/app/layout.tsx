import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import "./globals.css";
import { Providers } from "@/providers";
import AddTaskModal from "@/components/modals/AddTaskModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kanban",
  description: "Manage your tasks!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="" suppressHydrationWarning>
        <body className=''>
          <div className="overflow-y-hidden">
            <SignedOut>
            </SignedOut>
            <SignedIn>
            </SignedIn>
          </div>
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
