import { useState } from "react";
import { Link, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiLock, FiUser, FiArrowRight, FiShield, FiBriefcase, FiCheck } from "react-icons/fi";
import Button from "../../components/ui/Button";
import { Input, Label, ErrorText } from "../../components/ui/Field";
import Logo from "../../components/ui/Logo";
import { useToast } from "../../context/ToastContext";
import { useRole, ROLES, roleMeta } from "../../context/RoleContext";
import { useAuth } from "../../context/AuthContext";
import API_URL from "../../config/api";

const roleOptions = [
  { value: ROLES.CITIZEN, label: "Citizen", icon: FiUser, desc: "Report incidents, hire a lawyer, get AI guidance" },
  { value: ROLES.LAWYER, label: "Lawyer", icon: FiBriefcase, desc: "Manage consultations, clients, and appointments" },
  { value: ROLES.AUTHORITY, label: "Case Officer", icon: FiShield, desc: "Review reports and manage investigations" },
  { value: ROLES.ADMIN, label: "Admin", icon: FiShield, desc: "Oversee the platform end-to-end" },
];

export default function LoginPage() {
  const [params] = useSearchParams();
  const location = useLocation();
  const initialRole = Object.values(ROLES).includes(params.get("role")) ? params.get("role") : ROLES.CITIZEN;
  const mode = params.get("mode") === "signup" || location.pathname === "/register" ? "signup" : "login";

  const [role, setRole] = useState(initialRole);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { loginAs } = useRole();
  const { login } = useAuth();

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (mode === "signup" && !form.name.trim()) next.name = "Enter your full name.";
    if (!form.email.trim()) next.email = "Enter your email address.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.password) next.password = "Enter a password.";
    else if (form.password.length < 6) next.password = "Password must be at least 6 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  setSubmitting(true);

  try {
    const endpoint =
      mode === "login"
        ? `${API_URL}/auth/login`
        : `${API_URL}/auth/register`;

    const body =
      mode === "login"
        ? {
            email: form.email,
            password: form.password,
          }
        : {
            name: form.name,
            email: form.email,
            password: form.password,
            role,
          };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong.");
    }

    login(data.token, data.user);
    loginAs(data.user.role);

    toast.success(
      mode === "signup"
        ? "Account created — welcome to Justiva."
        : `Welcome back, signed in as ${roleMeta[data.user.role].label}.`,
      {
        title: mode === "signup" ? "Signed up" : "Signed in",
      }
    );

    const redirectTo =
      location.state?.from || roleMeta[data.user.role].homePath;

    navigate(redirectTo);
  } catch (error) {
    toast.error(error.message || "Authentication failed.", {
      title: "Error",
    });
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-navy-950 text-white lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(184,134,46,0.18),transparent_55%)]" />
        <Logo dark />
        <div className="relative">
          <p className="font-display text-3xl font-semibold leading-snug text-balance">
            "Every report, every consultation, handled with the same care as a courtroom filing."
          </p>
          <p className="mt-4 text-sm text-slate-400">— Justiva platform principle</p>
        </div>
        <div className="relative flex gap-6 text-sm text-slate-400">
          <span className="flex items-center gap-2"><FiShield className="h-4 w-4 text-brass-300" /> Encrypted by default</span>
          <span className="flex items-center gap-2"><FiBriefcase className="h-4 w-4 text-brass-300" /> Verified advocates only</span>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-14 sm:px-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>

          <h1 className="font-display text-2xl font-semibold text-ink">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            This is a demo login — choose a role below to explore its panel. Nothing is stored.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-2">
            {roleOptions.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setRole(r.value)}
                className={`relative rounded-lg border-2 p-3 text-left transition-colors ${
                  role === r.value ? "border-brass-600 bg-brass-100/50" : "border-line hover:border-slate-300"
                }`}
              >
                {role === r.value && (
                  <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brass-600 text-white">
                    <FiCheck className="h-2.5 w-2.5" />
                  </span>
                )}
                <r.icon className={`h-4 w-4 ${role === r.value ? "text-brass-700" : "text-slate-400"}`} />
                <p className="mt-1.5 text-xs font-semibold text-ink">{r.label}</p>
                <p className="mt-0.5 text-[11px] leading-snug text-slate-500">{r.desc}</p>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            <AnimatePresence mode="wait">
              {mode === "signup" && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <Label htmlFor="name" required>Full name</Label>
                  <div className="relative">
                    <FiUser className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
                    <Input id="name" className="pl-10" placeholder="Jane Rahman" value={form.name} onChange={update("name")} error={errors.name} />
                  </div>
                  <ErrorText>{errors.name}</ErrorText>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <Label htmlFor="email" required>Email address</Label>
              <div className="relative">
                <FiMail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
                <Input id="email" type="email" className="pl-10" placeholder="you@example.com" value={form.email} onChange={update("email")} error={errors.email} />
              </div>
              <ErrorText>{errors.email}</ErrorText>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password" required>Password</Label>
                {mode === "login" && (
                  <button type="button" className="text-xs font-medium text-navy-700 hover:text-brass-600" onClick={() => toast.info("Password reset is UI-only in this demo.")}>
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <FiLock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
                <Input id="password" type="password" className="pl-10" placeholder="••••••••" value={form.password} onChange={update("password")} error={errors.password} />
              </div>
              <ErrorText>{errors.password}</ErrorText>
            </div>

            <Button type="submit" variant="brass" className="w-full" loading={submitting}>
              {mode === "login" ? `Log in as ${roleMeta[role].label}` : "Create account"} <FiArrowRight />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            {mode === "login" ? "New to Justiva?" : "Already have an account?"}{" "}
            <button
              className="font-semibold text-navy-800 hover:text-brass-600"
              type="button"
              onClick={() => navigate(mode === "login" ? "/login?mode=signup" : "/login", { replace: true })}
            >
              {mode === "login" ? "Sign up" : "Log in"}
            </button>
          </p>

          <p className="mt-8 text-center text-xs text-slate-400">
            <Link to="/" className="hover:text-navy-700">← Back to home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}