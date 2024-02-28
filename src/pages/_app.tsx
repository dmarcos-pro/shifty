import { cn } from "@lib/utils";
import "@styles/globals.css";
import type { AppProps } from "next/app";
import { Inter as FontSans } from "next/font/google";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "./layout";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400",
});

type MyAppProps = AppProps & {
  Component: any;
  pageProps: any;
};

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div
        className={cn(
          "min-h-screen bg-background font-sans text-base antialiased",
          fontSans.variable
        )}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </QueryClientProvider>
  );
}
