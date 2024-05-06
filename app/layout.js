import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Toaster } from "@/components/ui/toaster"

export const metadata = {
  title: "Colloquy",
  description: "Social Media platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main> {children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
