import { useState } from "react";
import { FiBell, FiFileText, FiCalendar, FiUser, FiSpeaker, FiFlag, FiFolder, FiDatabase, FiShield } from "react-icons/fi";
import Card from "../ui/Card";
import Button from "../ui/Button";
import PageHeader from "../ui/PageHeader";
import EmptyState from "../ui/EmptyState";
import { cn } from "../../utils/cn";

const iconByType = {
  report: FiFileText,
  appointment: FiCalendar,
  lawyer: FiUser,
  announcement: FiSpeaker,
  request: FiFileText,
  review: FiUser,
  verification: FiShield,
  case: FiFolder,
  evidence: FiDatabase,
  moderation: FiFlag,
  system: FiBell,
};

export default function NotificationList({ title = "Notifications", initialNotifications }) {
  const [items, setItems] = useState(initialNotifications);
  const unreadCount = items.filter((n) => !n.read).length;

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id) => setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  return (
    <div className="container-page py-8">
      <PageHeader
        title={title}
        subtitle={unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "You're all caught up."}
        actions={
          unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllRead}>
              Mark all as read
            </Button>
          )
        }
      />

      {items.length === 0 ? (
        <EmptyState icon={FiBell} title="No notifications" description="You'll see updates here as they happen." className="mt-8" />
      ) : (
        <div className="mt-6 space-y-2.5">
          {items.map((n) => {
            const Icon = iconByType[n.type] || FiBell;
            return (
              <Card
                key={n.id}
                onClick={() => markRead(n.id)}
                className={cn("flex cursor-pointer items-start gap-3.5 p-4 transition-colors", !n.read && "border-brass-300 bg-brass-100/20")}
              >
                <div className={cn("mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full", n.read ? "bg-slate-100 text-slate-400" : "bg-brass-100 text-brass-700")}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className={cn("text-sm", n.read ? "font-medium text-slate-600" : "font-semibold text-ink")}>{n.title}</p>
                    {!n.read && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brass-600" />}
                  </div>
                  <p className="mt-0.5 text-sm text-slate-500">{n.body}</p>
                  <p className="mt-1 text-xs text-slate-400">{n.time}</p>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
