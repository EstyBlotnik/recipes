"use client";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useState } from "react";
import { PageNumberContext } from "./hooks/useRecipeContects";

export default function RootLayout({
  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [pageNumber, setPageNumber] = useState(1);
  return (
    <html lang="en">
      <body>
        
        <QueryClientProvider client={new QueryClient} >
        <PageNumberContext.Provider value={{ pageNumber, setPageNumber }}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
          </PageNumberContext.Provider>
        </QueryClientProvider>
        
      </body>
    </html>
  );
}
