"use client"; // indicate component shold be rendered on the client-side

import "./globals.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Nav from "@/components/Navigation";

import FinanceContextProvider from "@/lib/store/finance-context";
import AuthContextProvider from "@/lib/store/auth-context";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="https://www.svgrepo.com/show/482978/dollar-money.svg" />
        {/* Additional meta tags */}
        <meta name="description" content="finance tracking app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Finance Tracker</title>
      </head>
      <body>
        <AuthContextProvider>
          <FinanceContextProvider>
            <ToastContainer />
            <Nav />
            {children}
          </FinanceContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
