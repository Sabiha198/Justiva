import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiLogOut } from "react-icons/fi";
import Logo from "../ui/Logo";
import { cn } from "../../utils/cn";
import { useRole } from "../../context/RoleContext";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";

export default function PanelSidebar({ items, footerItems = [], collapsed, onToggle, mobileOpen, onCloseMobile }) {
  const { logout: roleLogout } = useRole();
const { logout: authLogout } = useAuth();
const toast = useToast();
  const navigate = useNavigate();

const handleLogout = () => {
  authLogout();
  roleLogout();

  toast.info("You've been signed out.");
};

  const renderLink = (item) => (
    <NavLink
      key={item.to}
      to={item.to}
      onClick={onCloseMobile}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
          collapsed && "justify-center px-0",
          isActive ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"
        )
      }
      title={collapsed ? item.label : undefined}
      end={item.to.split("/").length <= 2}
    >
      <item.icon className="h-[18px] w-[18px] shrink-0" />
      {!collapsed && <span className="truncate">{item.label}</span>}
    </NavLink>
  );

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-navy-950/50 lg:hidden" onClick={onCloseMobile} aria-hidden="true" />
      )}
      <motion.aside
        animate={{ width: collapsed ? 76 : 244 }}
        transition={{ duration: 0.18, ease: "easeInOut" }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-navy-900 text-white transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className={cn("flex h-16 items-center px-5", collapsed && "justify-center px-0")}>
          {collapsed ? (
            <svg width="28" height="28" viewBox="0 0 64 64" className="shrink-0">
              <circle cx="32" cy="32" r="30" fill="#F6F5F1" />
              <circle cx="32" cy="32" r="24" fill="none" stroke="#B8862E" strokeWidth="1.5" />
              <path
                d="M32 16 L32 40 M22 22 L42 22 M20 22 L16 34 A6 6 0 0 0 28 34 L24 22 M44 22 L40 34 A6 6 0 0 0 52 34 L48 22 M24 46 L40 46"
                fill="none" stroke="#14304D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          ) : (
            <Logo dark to="/" />
          )}
        </div>

        <nav className="mt-2 flex-1 space-y-1 overflow-y-auto px-3 pb-2 scrollbar-thin">
          {items.map(renderLink)}
        </nav>

        <div className="space-y-1 border-t border-white/10 p-3">
          {footerItems.map(renderLink)}
          <button
            onClick={handleLogout}
            className={cn(
              "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white",
              collapsed && "justify-center px-0"
            )}
          >
            <FiLogOut className="h-[18px] w-[18px] shrink-0" />
            {!collapsed && <span>Log out</span>}
          </button>
          <button
            onClick={onToggle}
            className={cn(
              "hidden w-full items-center gap-2 rounded-md px-3 py-2.5 text-sm text-slate-400 hover:bg-white/5 hover:text-white lg:flex",
              collapsed && "justify-center px-0"
            )}
          >
            {collapsed ? <FiChevronRight className="h-4 w-4" /> : <FiChevronLeft className="h-4 w-4" />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
}
