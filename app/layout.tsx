import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import LayoutClient from "../components/layout/layoutClient";
import ProtectedRoute from "@/components/protectedRouted/protectedRouted";

// React Query
import ReactQueryProvider from "../providers/ReactQueryProvider";
export const metadata: Metadata = {
  title: "Al Riyadh",
  description: "Store for children clothing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar">
      <body>

        <ReactQueryProvider>
          <ProtectedRoute>
            <LayoutClient>
              {children}
            </LayoutClient>
          </ProtectedRoute>
        </ReactQueryProvider>

      </body>
    </html>
  );
}