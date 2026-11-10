# Justiva — Legal Assistance & Crime Reporting Platform

A pure-frontend React application for a legal-tech platform: citizens report incidents
and get legal help, lawyers manage their practice, case officers investigate reports,
and admins oversee the platform — all as distinct, role-based panels on top of one
public marketing site.

This is a **frontend-only** project. There is no backend, no database, and no
persistent storage — all data lives in `src/data/*.js` as static mock data, "auth" is
a simulated role selector (`RoleContext`), and every interaction (filing a report,
booking an appointment, approving a lawyer, moderating a flagged report) is handled
with in-memory React state that resets on refresh.

## Tech stack

React 19 + Vite · React Router DOM · Tailwind CSS v4 + DaisyUI · Framer Motion ·
React Icons · react-markdown (AI assistant answers)

## Getting started

```bash
npm install
npm run dev
```

To try the internal panels, go to **Log in**, pick a role (Citizen / Lawyer / Case
Officer / Admin), and submit the form with any email/password — it's a demo login,
nothing is validated against a real account.

```bash
npm run build
npm run preview
```

## Project structure

```
src/
├── components/
│   ├── ui/            Reusable primitives — Button, Card, Modal, Drawer, Tabs,
│   │                   DataTable, StatCard, StatusBadge, Toast, ConfirmDialog…
│   ├── layout/          PanelSidebar, PanelTopbar, MarketingNavbar, Footer
│   ├── charts/           Dependency-free BarChart / LineChart / DonutChart
│   ├── lawyers/           LawyerCard, RatingStars
│   ├── reports/            Crime-report submission wizard steps
│   ├── ai/                  AI assistant chat UI pieces
│   ├── appointments/         Booking calendar widget
│   ├── notifications/         Shared NotificationList (used by all 4 panels)
│   └── account/                 Shared ProfileForm / SettingsPanel
├── context/            RoleContext (simulated role/auth), ToastContext
├── data/               Static mock data — lawyers, reports, cases, users,
│                        authorities, notifications, statistics, moderation…
├── layouts/            PublicLayout + PanelLayout (shared, role-guarded shell)
│                        with CitizenLayout / LawyerLayout / AuthorityLayout /
│                        AdminLayout as thin wrappers supplying nav + titles
├── pages/
│   ├── public/          Home, About, How It Works, Find Lawyers, FAQ, Contact,
│   │                     Emergency & Safety, Login/Register
│   ├── shared/           Pages rendered from both public and citizen routes,
│   │                      behaving differently by role (see below)
│   ├── citizen/          Dashboard, Report flow, My Reports, Appointments,
│   │                      Saved Lawyers, AI Assistant, Support, Documents…
│   ├── lawyer/            Dashboard, Professional Profile, Verification,
│   │                       Consultation Requests, Clients, Case Documents…
│   ├── authority/          Dashboard, Reports review, Case Management,
│   │                        Case Detail, Evidence, Case Timeline…
│   └── admin/               Dashboard, Users, Lawyers, Verification,
│                             Authorities, Organizations, Moderation,
│                             AI Analytics, Platform Settings…
├── routes/             AppRoutes.jsx (all routes), navConfig.js (per-role nav)
├── hooks/, utils/
├── App.jsx, main.jsx
```

### Why a `pages/shared/` folder

A few screens are genuinely the same page rendered in two contexts, just with
different behavior depending on the logged-in role:

- **Lawyer profile / category browse** — public visitors see "Request Consultation"
  (which routes to login); citizens see a real "Book Appointment" + "Save lawyer" flow.
- **Legal Resources** — public visitors get a read-only library; citizens get the same
  library with a "Save resource" action.

Duplicating these per-role would drift out of sync fast, so they're role-aware
components rendered at both `/find-lawyers/...` and `/citizen/lawyers/...` (and
similarly for legal resources).

## Role-based access (simulated)

`RoleContext` holds the current demo role in memory (`public`, `citizen`, `lawyer`,
`authority`, `admin`) with no persistence. Every panel route is wrapped by
`PanelLayout`, which checks the role and redirects to `/login?role=<panel>` if it
doesn't match — so visiting `/admin/dashboard` without "logging in" as Admin behaves
like a real protected route, without any real authentication behind it.

## Feature map by panel

**Public** — Home (hero, stats, featured lawyers, testimonials, FAQ/safety teasers),
About, How It Works, Find Lawyers (search/filter, public CTA gate), Legal Resources,
Legal Aid/NGO directory, Emergency & Safety (always public, no login wall), FAQ,
Contact, Login/Register with role selection.

**Citizen** — Dashboard, multi-step crime report wizard with generated report ID,
My Reports, Track Reports (try `JST-24A1F9`, `JST-88C0B2`, `JST-5D71E4`), Find Lawyers
→ book appointment, My Appointments (tabs + reschedule/cancel), Saved Lawyers, Legal
Resources with save, AI Legal Assistant (conversation sidebar, suggested prompts,
mock streamed markdown answers, copy/clear), Support & NGOs (emergency numbers,
nearby stations, aid orgs), Saved Documents, Notifications, Profile, Settings.

**Lawyer** — Dashboard (requests, schedule, clients), Professional Profile editor,
Credential Verification (upload UI, status tracking, Verified badge), Consultation
Requests (accept/decline), Appointments (confirm/decline, tabs), Clients (table +
detail drawer), Case Documents, Reviews, Notifications, Settings.

**Authority / Case Officer** — Dashboard, Reports review (accept/reject/assign/
request-info modal), Case Management (search/filter table), Case Detail (timeline,
investigation notes, evidence), Evidence (cross-case aggregate), Case Timeline
(merged activity feed), Notifications, Profile, Settings.

**Admin** — Dashboard (stat cards + bar/line/donut charts), Users (search/filter,
activate/suspend, detail drawer), Lawyers, Lawyer Verification (approve/reject queue),
Authorities (add/manage), Organizations (verify/edit/remove), Crime Reports
(platform-wide table), Report Moderation (flagged-report queue), Legal Resource
Management (add/edit/remove guides), Appointments (monitor/cancel), AI Analytics
(usage charts, top questions, source usage), Notifications, Platform Settings (crime
categories, emergency contacts, general toggles).

## What's intentionally not included

Per the current development phase, this is frontend-only:
- No backend, Node/Express server, or database
- No real authentication (role "login" is a demo selector, not a real account system)
- No REST API calls or AI API integration (AI Assistant uses canned mock responses)
- No localStorage/sessionStorage — nothing persists across a page refresh

All of this is designed to slot into a MERN backend later without a UI rewrite: forms,
tables, and state shapes mirror what real API responses would look like.
