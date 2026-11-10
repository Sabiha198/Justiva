import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiChevronDown, FiPhoneCall } from "react-icons/fi";
import Logo from "../ui/Logo";
import Button from "../ui/Button";
import { useRole, roleMeta } from "../../context/RoleContext";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../utils/cn";

const primaryLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/find-lawyers", label: "Find Lawyers" },
];

const moreLinks = [
  { to: "/about", label: "About Justiva" },
  { to: "/legal-resources", label: "Legal Resources" },
  { to: "/legal-aid", label: "Legal Aid / NGOs" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

const desktopLink = ({ isActive }) =>
  cn(
    "rounded-md px-3.5 py-2 text-sm font-medium transition-colors",
    isActive ? "bg-navy-50 text-navy-900" : "text-slate-600 hover:bg-navy-50 hover:text-navy-900"
  );

const mobileLink = ({ isActive }) =>
  cn(
    "rounded-md px-3.5 py-2.5 text-sm font-medium",
    isActive ? "bg-navy-50 font-semibold text-navy-900" : "text-slate-700 hover:bg-navy-50"
  );

export default function MarketingNavbar() {
  const { pathname } = useLocation();
  const { logout: roleLogout } = useRole();
  const { isAuthenticated, user, logout: authLogout } = useAuth();
  const meta = roleMeta[user?.role];
  const logout = () => {
    authLogout();
    roleLogout();
  };

  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const moreRef = useRef(null);
  const moreButtonRef = useRef(null);
  const hoverTimer = useRef(null);

  // Close both menus whenever the page changes (links, back button, redirects)
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setMoreOpen(false);
  }

  const moreActive = moreLinks.some((l) => pathname === l.to || pathname.startsWith(`${l.to}/`));

  // Shadow once the page has scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on outside click and Escape
  useEffect(() => {
    if (!moreOpen && !open) return undefined;

    const onPointerDown = (e) => {
      if (moreOpen && moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false);
    };
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (moreOpen) moreButtonRef.current?.focus();
      setMoreOpen(false);
      setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [moreOpen, open]);

  // Hover opens the menu for mouse users, with a short delay so it doesn't flicker
  const hoverOpen = (e) => {
    if (e.pointerType !== "mouse") return;
    clearTimeout(hoverTimer.current);
    setMoreOpen(true);
  };
  const hoverClose = (e) => {
    if (e.pointerType !== "mouse") return;
    hoverTimer.current = setTimeout(() => setMoreOpen(false), 150);
  };

  const accountButtons = (onNavigate, layout) =>
    isAuthenticated ? (
      <>
        <Button as={Link} to={meta?.homePath || "/"} variant="brass" size="sm" className={layout} onClick={onNavigate}>
          Dashboard
        </Button>
        <Button
          type="button"
          variant={layout ? "outline" : "ghost"}
          size="sm"
          className={layout}
          onClick={() => {
            logout();
            onNavigate?.();
          }}
        >
          Log out
        </Button>
      </>
    ) : (
      <>
        <Button as={Link} to="/login" variant={layout ? "outline" : "ghost"} size="sm" className={layout} onClick={onNavigate}>
          Log in
        </Button>
        <Button as={Link} to="/login?mode=signup" variant="brass" size="sm" className={layout} onClick={onNavigate}>
          Get Started
        </Button>
      </>
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-line/70 bg-paper/90 backdrop-blur-md transition-shadow",
        scrolled && "shadow-card"
      )}
    >
      <div className="container-page flex h-14 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {primaryLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={desktopLink}>
              {l.label}
            </NavLink>
          ))}

          <div ref={moreRef} className="relative" onPointerEnter={hoverOpen} onPointerLeave={hoverClose}>
            <button
              ref={moreButtonRef}
              type="button"
              aria-haspopup="menu"
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen((v) => !v)}
              className={cn(
                "flex items-center gap-1 rounded-md px-3.5 py-2 text-sm font-medium transition-colors",
                moreActive || moreOpen
                  ? "bg-navy-50 text-navy-900"
                  : "text-slate-600 hover:bg-navy-50 hover:text-navy-900"
              )}
            >
              More <FiChevronDown className={cn("h-3.5 w-3.5 transition-transform", moreOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  role="menu"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full w-56 overflow-hidden rounded-lg border border-line bg-white py-1.5 shadow-lift"
                >
                  {moreLinks.map((l) => (
                    <NavLink
                      key={l.to}
                      to={l.to}
                      role="menuitem"
                      className={({ isActive }) =>
                        cn(
                          "block px-4 py-2 text-sm",
                          isActive
                            ? "bg-navy-50 font-semibold text-navy-900"
                            : "text-slate-600 hover:bg-navy-50 hover:text-navy-900"
                        )
                      }
                    >
                      {l.label}
                    </NavLink>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            to="/emergency-safety"
            className="mr-1 flex items-center gap-1.5 rounded-md px-2.5 py-2 text-xs font-semibold text-alert-600 hover:bg-alert-100"
          >
            <FiPhoneCall className="h-3.5 w-3.5" /> Emergency
          </Link>
          {accountButtons()}
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-navy-900 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line bg-paper lg:hidden"
          >
            {/* scrolls on short phones so the last links and buttons are always reachable */}
            <div className="container-page flex max-h-[calc(100dvh-6rem)] flex-col gap-1 overflow-y-auto py-4">
              {[...primaryLinks, ...moreLinks].map((l) => (
                <NavLink key={l.to} to={l.to} end={l.end} className={mobileLink}>
                  {l.label}
                </NavLink>
              ))}
              <NavLink to="/emergency-safety" className={mobileLink}>
                Emergency &amp; Safety
              </NavLink>
              <div className="mt-2 flex gap-2 border-t border-line pt-4">{accountButtons(() => setOpen(false), "flex-1")}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}