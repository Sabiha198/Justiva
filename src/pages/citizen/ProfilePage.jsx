import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import API_URL from "../../config/api";

// Your existing ProfileForm import
import ProfileForm from "../../components/account/ProfileForm";
export default function ProfilePage() {
  const { user, token } = useAuth();

  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/users/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || data.message || "Failed to load profile"
          );
        }

        setProfile(data.user);
      } catch (error) {
        console.error("Profile error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [token]);

  if (loading) {
    return (
      <div className="container-page py-12">
        <p className="text-sm text-slate-500">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <ProfileForm
      title="Profile"
      initialValues={{
        name: profile?.name || "",
        email: profile?.email || "",
        phone: profile?.phone || "",
        city: profile?.city || "",
      }}
    />
  );
}