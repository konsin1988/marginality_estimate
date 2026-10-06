import Header from "./Header";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="select-none min-h-screen min-w-screen">
      <Header />

      <Navigation />

        <main className="
          bg-[#fafcff] 
          min-h-[88vh]
          flex overflow-x-scroll 
          w-full mt-6 
          flex items-center justify-center
        ">
            <Outlet  />
        </main>

      <Footer />
    </div>
  );
}
