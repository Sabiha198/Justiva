import NotificationList from "../../components/notifications/NotificationList";
import { lawyerNotifications } from "../../data/notifications";

export default function LawyerNotificationsPage() {
  return <NotificationList title="Notifications" initialNotifications={lawyerNotifications} />;
}
