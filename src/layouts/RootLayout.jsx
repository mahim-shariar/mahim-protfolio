import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="app">
      <Navbar />

      <Outlet />

      <FooterSection />
    </div>
  );
};

export default RootLayout;
