import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import { RoleProvider } from "./context/RoleContext";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <RoleProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </RoleProvider>
    </BrowserRouter>
  );
}
