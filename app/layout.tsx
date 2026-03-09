import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { EmployeesProvider } from "../context/EmployeesContext";
import { AttendanceProvider } from "@/context/AttendanceContext";
import { ProductProvider } from "@/context/ProductContext";
import { SalesProvider } from "@/context/SalesContext";
import LayoutClient from "../components/layout/layoutClient";
import ProtectedRoute from "@/components/protectedRouted/protectedRouted";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProtectedRoute>
        <EmployeesProvider>
          <AttendanceProvider>
            <ProductProvider>
              <SalesProvider>
                <LayoutClient>
                  {children}
                </LayoutClient>
              </SalesProvider>
            </ProductProvider>
          </AttendanceProvider>
        </EmployeesProvider>
        </ProtectedRoute>
      </body>
    </html>
  );
}