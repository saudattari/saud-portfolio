import { Mail, Send, ShieldCheck } from "lucide-react";
import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import { useProfile } from "../utils/useSiteData";

function encode(data) {
  return Object.keys(data)
    .map(
      (key) =>
        encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
    )
    .join("&");
}

export default function Contact() {
  const profile = useProfile();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    try {
      await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: encode({ "form-name": "contact", ...form }),
      });

      setStatus("Message sent successfully.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("Failed to send message. Please email directly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="container-custom">

        <SectionTitle
          label="Contact"
          title="Let’s build your Android app"
          description={`Reach me directly at ${profile.email}`}
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-2">

          {/* LEFT INFO PANEL */}
          <div className="space-y-6">

            {/* MAIN CARD */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-black text-slate-900">
                Work with me
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                Android development services including Jetpack Compose UI,
                Firebase integration, API development, and app optimization.
              </p>

              <a
                href={`mailto:${profile.email}`}
                className="mt-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                <Mail size={18} />
                {profile.email}
              </a>
            </div>

            {/* INFO BOX */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm shadow-sm">
              <div className="flex items-center gap-2 text-indigo-600">
                <ShieldCheck size={18} />
                <p className="font-semibold">Form handling</p>
              </div>

              <p className="mt-3 text-slate-600 leading-6">
                Messages are handled via Netlify Forms. After deployment,
                enable email notifications in your Netlify dashboard.
              </p>
            </div>

          </div>

          {/* RIGHT FORM */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">

            <h3 className="text-xl font-bold text-slate-900">
              Send a message
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              I usually respond within 24–48 hours.
            </p>

            <form
              name="contact"
              method="POST"
              data-netlify="true"
              onSubmit={submit}
              className="mt-8 space-y-5"
            >
              <input type="hidden" name="form-name" value="contact" />

              <Input
                label="Your Name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
              />

              <Input
                label="Your Email"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
              />

              <Input
                label="Subject"
                value={form.subject}
                onChange={(v) => setForm({ ...form, subject: v })}
              />

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Message
                </label>

                <textarea
                  rows="5"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700 disabled:opacity-60"
              >
                <Send size={18} />
                {loading ? "Sending..." : "Send Message"}
              </button>

              {status && (
                <p className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* INPUT COMPONENT */
function Input({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
        required
      />
    </div>
  );
}