import NotificationList from "../../components/notifications/NotificationList";
import { adminNotifications } from "../../data/notifications";

export default function AdminNotificationsPage() {
  return <NotificationList title="Notifications" initialNotifications={adminNotifications} />;
}
