
import { Leftsidebar, Rightsidebar, Topbar } from "@/components/shared";
import "../globals.css";


export const metadata = {
  title: "Colloquy",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <main className="h-screen overflow-y-hidden">
      <Topbar />
      <div className="grid grid-cols-12">
        <Leftsidebar />
      <section className={' hide-scroll-bar col-span-12 dark:bg-dark-3 bg-light-3 md:col-span-8 lg:col-span-6 max-h-screen h-screen overflow-y-scroll'} >{children}</section>
        <Rightsidebar />
      </div>
    </main>
  );
}
