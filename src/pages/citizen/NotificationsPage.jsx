import NotificationList from "../../components/notifications/NotificationList";
import { citizenNotifications } from "../../data/notifications";

export default function NotificationsPage() {
  return <NotificationList title="Notifications" initialNotifications={citizenNotifications} />;
}
