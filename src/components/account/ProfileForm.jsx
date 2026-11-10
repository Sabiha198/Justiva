import { useEffect, useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiSave,
} from "react-icons/fi";

import Card from "../ui/Card";
import Button from "../ui/Button";
import PageHeader from "../ui/PageHeader";
import { Input, Label, Textarea } from "../ui/Field";

import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import API_URL from "../../config/api";

export default function ProfileForm({
  title = "Profile",
  initialValues,
  extraFields,
}) {
  const { token } = useAuth();
  const toast = useToast();

  const [form, setForm] = useState(initialValues);
  const [saving, setSaving] = useState(false);

  // Update form when profile data is loaded from backend
  useEffect(() => {
    setForm(initialValues);
  }, [initialValues]);

  const update = (key) => (e) => {
    setForm((current) => ({
      ...current,
      [key]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please log in again.", {
        title: "Authentication required",
      });
      return;
    }

    if (!form.name?.trim()) {
      toast.error("Name is required.", {
        title: "Invalid profile",
      });
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(`${API_URL}/users/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          city: form.city,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.message ||
            "Failed to update profile"
        );
      }

      // Replace local form with the data returned by backend
      setForm({
        name: data.user?.name || "",
        email: data.user?.email || "",
        phone: data.user?.phone || "",
        city: data.user?.city || "",
        ...(data.user?.bio
          ? { bio: data.user.bio }
          : {}),
      });

      toast.success(
        "Your profile has been updated successfully.",
        {
          title: "Profile updated",
        }
      );
    } catch (error) {
      console.error("Update profile error:", error);

      toast.error(
        error.message || "Failed to update profile.",
        {
          title: "Update failed",
        }
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container-page py-8">
      <PageHeader
        title={title}
        subtitle="Update your personal information."
      />

      <form
        onSubmit={handleSubmit}
        className="mt-6 max-w-2xl"
      >
        <Card className="p-6 sm:p-8">
          {/* Profile heading */}
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-navy-800 font-display text-xl font-semibold text-white">
              {form.name?.charAt(0)?.toUpperCase() || "C"}
            </div>

            <div>
              <p className="text-sm font-semibold text-ink">
                {form.name || "Citizen"}
              </p>

              <p className="text-xs text-slate-500">
                Your citizen profile information.
              </p>
            </div>
          </div>

          {/* Fields */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {/* Name */}
            <div>
              <Label htmlFor="name">
                Full name
              </Label>

              <div className="relative">
                <FiUser className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />

                <Input
                  id="name"
                  className="pl-10"
                  value={form.name || ""}
                  onChange={update("name")}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">
                Email address
              </Label>

              <div className="relative">
                <FiMail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />

                <Input
                  id="email"
                  type="email"
                  className="pl-10"
                  value={form.email || ""}
                  disabled
                />
              </div>

              <p className="mt-1 text-xs text-slate-400">
                Email cannot be changed here.
              </p>
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone">
                Phone number
              </Label>

              <div className="relative">
                <FiPhone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />

                <Input
                  id="phone"
                  className="pl-10"
                  value={form.phone || ""}
                  onChange={update("phone")}
                />
              </div>
            </div>

            {/* City */}
            <div>
              <Label htmlFor="city">
                City
              </Label>

              <div className="relative">
                <FiMapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />

                <Input
                  id="city"
                  className="pl-10"
                  value={form.city || ""}
                  onChange={update("city")}
                />
              </div>
            </div>
          </div>

          {extraFields}

          {/* Bio */}
          {"bio" in form && (
            <div className="mt-4">
              <Label htmlFor="bio">
                About
              </Label>

              <Textarea
                id="bio"
                rows={3}
                value={form.bio || ""}
                onChange={update("bio")}
              />
            </div>
          )}

          {/* Save */}
          <Button
            type="submit"
            variant="brass"
            className="mt-6"
            loading={saving}
            disabled={saving}
          >
            <FiSave />
            {saving ? "Saving..." : "Save changes"}
          </Button>
        </Card>
      </form>
    </div>
  );
}