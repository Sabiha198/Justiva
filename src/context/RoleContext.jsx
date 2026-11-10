import { createContext, useContext, useState } from "react";

// Simulated role-based "auth" for this frontend-only phase. No real
// authentication, no persistence — the selected role lives in memory
// only and resets on refresh, exactly like everything else in the app.

export const ROLES = {
  PUBLIC: "public",
  CITIZEN: "citizen",
  LAWYER: "lawyer",
  AUTHORITY: "authority",
  ADMIN: "admin",
};

export const roleMeta = {
  citizen: { label: "Citizen", homePath: "/citizen/dashboard", demoName: "Shafwat Mahiya" },
  lawyer: { label: "Lawyer", homePath: "/lawyer/dashboard", demoName: "Adv. Arif Mahmud" },
  authority: { label: "Case Officer", homePath: "/authority/dashboard", demoName: "Officer R. Chowdhury" },
  admin: { label: "Admin", homePath: "/admin/dashboard", demoName: "Platform Admin" },
};

const RoleContext = createContext(null);

export function RoleProvider({ children }) {
  const [role, setRole] = useState(ROLES.PUBLIC);

  const loginAs = (nextRole) => setRole(nextRole);
  const logout = () => setRole(ROLES.PUBLIC);

  const value = {
    role,
    isAuthenticated: role !== ROLES.PUBLIC,
    meta: roleMeta[role] || null,
    loginAs,
    logout,
  };

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within RoleProvider");
  return ctx;
}
