import { Routes, Route } from "react-router-dom";
import useScrollToTop from "../hooks/useScrollToTop";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import PublicLayout from "../layouts/PublicLayout";
import CitizenLayout from "../layouts/CitizenLayout";
import LawyerLayout from "../layouts/LawyerLayout";
import AuthorityLayout from "../layouts/AuthorityLayout";
import AdminLayout from "../layouts/AdminLayout";
import RoleProtectedRoute from "../components/auth/RoleProtectedRoute";

// Public
import HomePage from "../pages/public/HomePage";
import LoginPage from "../pages/public/LoginPage";
import AboutPage from "../pages/public/AboutPage";
import HowItWorksPage from "../pages/public/HowItWorksPage";
import FindLawyersPage from "../pages/public/FindLawyersPage";
import FaqPage from "../pages/public/FaqPage";
import ContactPage from "../pages/public/ContactPage";
import EmergencySafetyPage from "../pages/public/EmergencySafetyPage";

// Shared (role-aware, used by both public + citizen routes)
import LawyerCategoryPage from "../pages/shared/LawyerCategoryPage";
import LawyerProfilePage from "../pages/shared/LawyerProfilePage";
import LegalResourcesPage from "../pages/shared/LegalResourcesPage";
import LegalAidPage from "../pages/shared/LegalAidPage";

// Citizen
import CitizenDashboardPage from "../pages/citizen/CitizenDashboardPage";
import ReportHomePage from "../pages/citizen/ReportHomePage";
import SubmitReportPage from "../pages/citizen/SubmitReportPage";
import MyReportsPage from "../pages/citizen/MyReportsPage";
import TrackReportPage from "../pages/citizen/TrackReportPage";
import CitizenFindLawyersPage from "../pages/citizen/CitizenFindLawyersPage";
import AppointmentBookingPage from "../pages/citizen/AppointmentBookingPage";
import MyAppointmentsPage from "../pages/citizen/MyAppointmentsPage";
import SavedLawyersPage from "../pages/citizen/SavedLawyersPage";
import AiAssistantHomePage from "../pages/citizen/AiAssistantHomePage";
import AiChatPage from "../pages/citizen/AiChatPage";
import SupportPage from "../pages/citizen/SupportPage";
import SavedDocumentsPage from "../pages/citizen/SavedDocumentsPage";
import CitizenNotificationsPage from "../pages/citizen/NotificationsPage";
import CitizenProfilePage from "../pages/citizen/ProfilePage";
import CitizenSettingsPage from "../pages/citizen/SettingsPage";

// Lawyer
import LawyerDashboardPage from "../pages/lawyer/LawyerDashboardPage";
import LawyerProfileEditPage from "../pages/lawyer/LawyerProfileEditPage";
import CredentialVerificationPage from "../pages/lawyer/CredentialVerificationPage";
import ConsultationRequestsPage from "../pages/lawyer/ConsultationRequestsPage";
import LawyerAppointmentsPage from "../pages/lawyer/LawyerAppointmentsPage";
import ClientsPage from "../pages/lawyer/ClientsPage";
import CaseDocumentsPage from "../pages/lawyer/CaseDocumentsPage";
import ReviewsPage from "../pages/lawyer/ReviewsPage";
import LawyerNotificationsPage from "../pages/lawyer/LawyerNotificationsPage";
import LawyerSettingsPage from "../pages/lawyer/LawyerSettingsPage";

// Authority
import AuthorityDashboardPage from "../pages/authority/AuthorityDashboardPage";
import ReportsReviewPage from "../pages/authority/ReportsReviewPage";
import CaseManagementPage from "../pages/authority/CaseManagementPage";
import CaseDetailPage from "../pages/authority/CaseDetailPage";
import EvidencePage from "../pages/authority/EvidencePage";
import CaseTimelinePage from "../pages/authority/CaseTimelinePage";
import AuthorityNotificationsPage from "../pages/authority/AuthorityNotificationsPage";
import AuthorityProfilePage from "../pages/authority/AuthorityProfilePage";
import AuthoritySettingsPage from "../pages/authority/AuthoritySettingsPage";

// Admin
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import UsersPage from "../pages/admin/UsersPage";
import LawyersManagementPage from "../pages/admin/LawyersManagementPage";
import LawyerVerificationPage from "../pages/admin/LawyerVerificationPage";
import AuthoritiesManagementPage from "../pages/admin/AuthoritiesManagementPage";
import OrganizationsManagementPage from "../pages/admin/OrganizationsManagementPage";
import CrimeReportsPage from "../pages/admin/CrimeReportsPage";
import ReportModerationPage from "../pages/admin/ReportModerationPage";
import LegalResourceManagementPage from "../pages/admin/LegalResourceManagementPage";
import AppointmentsManagementPage from "../pages/admin/AppointmentsManagementPage";
import AiAnalyticsPage from "../pages/admin/AiAnalyticsPage";
import AdminNotificationsPage from "../pages/admin/AdminNotificationsPage";
import PlatformSettingsPage from "../pages/admin/PlatformSettingsPage";

import NotFoundPage from "../pages/NotFoundPage";

export default function AppRoutes() {
  useScrollToTop();
  return (
    <Routes>
      {/* ---------------- Public website ---------------- */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/find-lawyers" element={<FindLawyersPage />} />
        <Route path="/find-lawyers/category/:slug" element={<LawyerCategoryPage />} />
        <Route path="/find-lawyers/:id" element={<LawyerProfilePage />} />
        <Route path="/legal-resources" element={<LegalResourcesPage />} />
        <Route path="/legal-aid" element={<LegalAidPage />} />
        <Route path="/emergency-safety" element={<EmergencySafetyPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage />} />
      </Route>

      {/* ---------------- Citizen panel ---------------- */}
      {/* ---------------- Citizen panel ---------------- */}
<Route
  element={
    <ProtectedRoute>
      <RoleProtectedRoute allowedRoles={["citizen"]}>
        <CitizenLayout />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
>
  <Route path="/citizen/dashboard" element={<CitizenDashboardPage />} />
  <Route path="/citizen/report" element={<ReportHomePage />} />
  <Route path="/citizen/report/new" element={<SubmitReportPage />} />
  <Route path="/citizen/reports" element={<MyReportsPage />} />
  <Route path="/citizen/reports/track" element={<TrackReportPage />} />
  <Route path="/citizen/lawyers" element={<CitizenFindLawyersPage />} />
  <Route path="/citizen/lawyers/category/:slug" element={<LawyerCategoryPage />} />
  <Route path="/citizen/lawyers/:id" element={<LawyerProfilePage />} />
  <Route path="/citizen/lawyers/:id/book" element={<AppointmentBookingPage />} />
  <Route path="/citizen/appointments" element={<MyAppointmentsPage />} />
  <Route path="/citizen/saved-lawyers" element={<SavedLawyersPage />} />
  <Route path="/citizen/legal-resources" element={<LegalResourcesPage />} />
  <Route path="/citizen/ai" element={<AiAssistantHomePage />} />
  <Route path="/citizen/ai/chat" element={<AiChatPage />} />
  <Route path="/citizen/support" element={<SupportPage />} />
  <Route path="/citizen/documents" element={<SavedDocumentsPage />} />
  <Route path="/citizen/notifications" element={<CitizenNotificationsPage />} />
  <Route path="/citizen/profile" element={<CitizenProfilePage />} />
  <Route path="/citizen/settings" element={<CitizenSettingsPage />} />
</Route>
      {/* ---------------- Lawyer panel ---------------- */}
        <Route
  element={
    <ProtectedRoute>
      <RoleProtectedRoute allowedRoles={["lawyer"]}>
        <LawyerLayout />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
>
        <Route path="/lawyer/dashboard" element={<LawyerDashboardPage />} />
        <Route path="/lawyer/profile" element={<LawyerProfileEditPage />} />
        <Route path="/lawyer/verification" element={<CredentialVerificationPage />} />
        <Route path="/lawyer/requests" element={<ConsultationRequestsPage />} />
        <Route path="/lawyer/appointments" element={<LawyerAppointmentsPage />} />
        <Route path="/lawyer/clients" element={<ClientsPage />} />
        <Route path="/lawyer/documents" element={<CaseDocumentsPage />} />
        <Route path="/lawyer/reviews" element={<ReviewsPage />} />
        <Route path="/lawyer/notifications" element={<LawyerNotificationsPage />} />
        <Route path="/lawyer/settings" element={<LawyerSettingsPage />} />
      </Route>

      {/* ---------------- Authority panel ---------------- */}
<Route
  element={
    <ProtectedRoute>
      <RoleProtectedRoute allowedRoles={["authority"]}>
        <AuthorityLayout />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
>
        <Route path="/authority/dashboard" element={<AuthorityDashboardPage />} />
        <Route path="/authority/reports" element={<ReportsReviewPage />} />
        <Route path="/authority/cases" element={<CaseManagementPage />} />
        <Route path="/authority/cases/:id" element={<CaseDetailPage />} />
        <Route path="/authority/evidence" element={<EvidencePage />} />
        <Route path="/authority/timeline" element={<CaseTimelinePage />} />
        <Route path="/authority/notifications" element={<AuthorityNotificationsPage />} />
        <Route path="/authority/profile" element={<AuthorityProfilePage />} />
        <Route path="/authority/settings" element={<AuthoritySettingsPage />} />
      </Route>

      {/* ---------------- Admin panel ---------------- */}
<Route
  element={
    <ProtectedRoute>
      <RoleProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
>
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/admin/lawyers" element={<LawyersManagementPage />} />
        <Route path="/admin/lawyers/verification" element={<LawyerVerificationPage />} />
        <Route path="/admin/authorities" element={<AuthoritiesManagementPage />} />
        <Route path="/admin/organizations" element={<OrganizationsManagementPage />} />
        <Route path="/admin/reports" element={<CrimeReportsPage />} />
        <Route path="/admin/reports/moderation" element={<ReportModerationPage />} />
        <Route path="/admin/legal-resources" element={<LegalResourceManagementPage />} />
        <Route path="/admin/appointments" element={<AppointmentsManagementPage />} />
        <Route path="/admin/ai-analytics" element={<AiAnalyticsPage />} />
        <Route path="/admin/notifications" element={<AdminNotificationsPage />} />
        <Route path="/admin/settings" element={<PlatformSettingsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
