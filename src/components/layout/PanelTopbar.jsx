import { Link } from "react-router-dom";
import { FiMenu, FiBell } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

export default function PanelTopbar({
  title,
  onOpenMobile,
  notificationsPath,
  unreadCount = 0,
}) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-line bg-paper/90 px-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobile}
          className="rounded-md p-2 text-navy-900 hover:bg-navy-50 lg:hidden"
          aria-label="Open menu"
        >
          <FiMenu className="h-5 w-5" />
        </button>

        <h1 className="font-display text-lg font-semibold text-ink">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        {notificationsPath && (
          <Link
            to={notificationsPath}
            className="relative rounded-full p-2 text-slate-500 hover:bg-navy-50 hover:text-navy-800"
            aria-label="Notifications"
          >
            <FiBell className="h-[18px] w-[18px]" />

            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-alert-600" />
            )}
          </Link>
        )}

        <div className="flex items-center gap-2 rounded-full border border-line bg-white py-1 pl-1 pr-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-navy-800 text-xs font-semibold text-white">
            {user?.name?.charAt(0) || "J"}
          </div>

          <span className="hidden text-xs font-medium text-slate-600 sm:inline">
            {user?.name || "User"}
          </span>
        </div>
      </div>
    </header>
  );
}