import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { Input, Textarea, Select, Label, ErrorText } from "../../components/ui/Field";
import { useToast } from "../../context/ToastContext";
import PageHero from "../../components/art/PageHero";
import { pageMedia } from "../../data/media";

const topics = ["General inquiry", "Report a technical issue", "Lawyer partnership", "NGO partnership", "Press / media"];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", topic: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const toast = useToast();

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Enter your name.";
    if (!/\S+@\S+\.\S+/.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.topic) next.topic = "Select a topic.";
    if (!form.message.trim() || form.message.trim().length < 10) next.message = "Add a little more detail.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
      toast.success("Your message has been sent to our team.");
    }, 800);
  };

  return (
    <div>
      <PageHero
        art="mail"
        media={pageMedia.contact}
        title="Contact Us"
        subtitle="Questions, partnership inquiries, or feedback. We'd like to hear from you."
      />

    <div className="container-page pb-16 sm:pb-20">
      <div className="mx-auto mt-12 grid max-w-4xl gap-6 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-4">
          <Card className="p-6">
            <FiMail className="h-5 w-5 text-navy-800" />
            <p className="mt-3 text-sm font-semibold text-ink">Email</p>
            <p className="mt-1 text-sm text-slate-500">support@justiva.app</p>
          </Card>
          <Card className="p-6">
            <FiPhone className="h-5 w-5 text-navy-800" />
            <p className="mt-3 text-sm font-semibold text-ink">Phone</p>
            <p className="mt-1 text-sm text-slate-500">+880 1700-000000 (Mon–Fri, 9am–6pm)</p>
          </Card>
          <Card className="p-6">
            <FiMapPin className="h-5 w-5 text-navy-800" />
            <p className="mt-3 text-sm font-semibold text-ink">Office</p>
            <p className="mt-1 text-sm text-slate-500">Agrabad Commercial Area, Chattogram, Bangladesh</p>
          </Card>
        </div>

        <Card className="p-6 sm:p-8">
          {sent ? (
            <div className="flex flex-col items-center py-8 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pine-100 text-pine-700">
                <FiSend className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">Message sent</h3>
              <p className="mt-1.5 max-w-xs text-sm text-slate-500">Thanks for reaching out — our team typically responds within one business day.</p>
              <Button variant="outline" className="mt-5" onClick={() => { setSent(false); setForm({ name: "", email: "", topic: "", message: "" }); }}>
                Send another message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name" required>Name</Label>
                  <Input id="name" value={form.name} onChange={update("name")} error={errors.name} placeholder="Your full name" />
                  <ErrorText>{errors.name}</ErrorText>
                </div>
                <div>
                  <Label htmlFor="email" required>Email</Label>
                  <Input id="email" type="email" value={form.email} onChange={update("email")} error={errors.email} placeholder="you@example.com" />
                  <ErrorText>{errors.email}</ErrorText>
                </div>
              </div>
              <div>
                <Label htmlFor="topic" required>Topic</Label>
                <Select id="topic" value={form.topic} onChange={update("topic")} error={errors.topic}>
                  <option value="">Select a topic</option>
                  {topics.map((t) => <option key={t} value={t}>{t}</option>)}
                </Select>
                <ErrorText>{errors.topic}</ErrorText>
              </div>
              <div>
                <Label htmlFor="message" required>Message</Label>
                <Textarea id="message" rows={5} value={form.message} onChange={update("message")} error={errors.message} placeholder="How can we help?" />
                <ErrorText>{errors.message}</ErrorText>
              </div>
              <Button type="submit" variant="brass" className="w-full" loading={submitting}>
                <FiSend /> Send message
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
    </div>
  );
}
