import { Outlet } from "react-router-dom";
import MarketingNavbar from "../components/layout/MarketingNavbar";
import Footer from "../components/layout/Footer";

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <MarketingNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
