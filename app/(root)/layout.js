
import { Leftsidebar, Rightsidebar, Topbar } from "@/components/shared";
import "../globals.css";


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <main className="">
      <Topbar />
      <div className="grid grid-cols-12">
        <Leftsidebar />
      <section className={'col-span-12 bg-blue-600 md:col-span-8 lg:col-span-6 max-h-screen h-screen overflow-y-scroll'} >{children}</section>
        <Rightsidebar />
      </div>
    </main>
  );
}
