import { useState } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import PanelSidebar from "../components/layout/PanelSidebar";
import PanelTopbar from "../components/layout/PanelTopbar";
import { useRole } from "../context/RoleContext";

// Shared shell for all four internal (role-based) panels. Renders the
// correct nav set, guards the route against the wrong/no demo role,
// and resolves a page title from the current path.
export default function PanelLayout({ requiredRole, items, footerItems, titleMap, notificationsPath }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { role } = useRole();

  if (role !== requiredRole) {
    return <Navigate to={`/login?role=${requiredRole}`} replace state={{ from: location.pathname }} />;
  }

  const title =
    titleMap[location.pathname] ||
    [...items, ...footerItems].find((i) => location.pathname.startsWith(i.to))?.label ||
    "Justiva";

  return (
    <div className="flex min-h-screen bg-paper">
      <PanelSidebar
        items={items}
        footerItems={footerItems}
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className="flex min-h-screen flex-1 flex-col overflow-x-hidden">
        <PanelTopbar title={title} onOpenMobile={() => setMobileOpen(true)} notificationsPath={notificationsPath} />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
