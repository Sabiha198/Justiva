import NotificationList from "../../components/notifications/NotificationList";
import { authorityNotifications } from "../../data/notifications";

export default function AuthorityNotificationsPage() {
  return <NotificationList title="Notifications" initialNotifications={authorityNotifications} />;
}
