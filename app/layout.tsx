import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { Providers } from "../providers/Providers";
import Footer from "../component/footer"; // 

export const metadata = {
  title: "Smart Waste Tracker",
  description: "Dashboard to monitor spoilage and reduce waste",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col min-h-screen">
        <ClerkProvider>
          <Providers>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <main className="flex-grow">{children}</main> {/* ✅ Wrap in <main> for spacing */}
              <Footer /> {/* ✅ Add footer here */}
            </ThemeProvider>
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
