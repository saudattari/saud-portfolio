import { Mail, Send, ShieldCheck } from "lucide-react";
import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import { useProfile } from "../utils/useSiteData";

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default function Contact() {
  const profile = useProfile();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");

  async function submit(e) {
    e.preventDefault();
    setStatus("Sending...");
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...form })
      });
      setStatus("Message submitted successfully. On Netlify, you can view it in Forms.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("Message failed. Please use direct email.");
    }
  }

  return (
    <section className="py-20">
      <div className="container-custom">
        <SectionTitle
          label="Contact"
          title="Let’s build your Android app"
          description={`The visible contact email is ${profile.email}. Form notifications can be sent to ${profile.formReceiver} after Netlify setup.`}
        />

        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="rounded-[36px] bg-slate-950 p-8 text-white shadow-card md:p-10">
            <h3 className="text-3xl font-black">Need an Android developer?</h3>
            <p className="mt-5 leading-8 text-slate-300">
              I can help with Android app development, Jetpack Compose, XML UI,
              Firebase, API integration, app improvement, and bug fixing.
            </p>

            <a href={`mailto:${profile.email}`} className="mt-8 flex items-center gap-3 rounded-[24px] bg-white/8 p-4 font-bold text-white">
              <Mail size={20} /> {profile.email}
            </a>

            <div className="mt-6 rounded-[24px] border border-white/10 bg-white/5 p-5">
              <div className="flex items-center gap-3 text-cyan-300">
                <ShieldCheck size={20} />
                <p className="font-bold">Netlify Form Note</p>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                After deployment, open Netlify → Forms → Notifications and add
                <span className="font-bold text-white"> {profile.formReceiver}</span> as the email notification receiver.
              </p>
            </div>
          </div>

          <form
            name="contact"
            method="POST"
            data-netlify="true"
            onSubmit={submit}
            className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-soft md:p-10"
          >
            <input type="hidden" name="form-name" value="contact" />
            <div className="grid gap-5">
              <Field label="Your Name" name="name" value={form.name} onChange={setForm} />
              <Field label="Your Email" name="email" type="email" value={form.email} onChange={setForm} />
              <Field label="Subject" name="subject" value={form.subject} onChange={setForm} />
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                Message
                <textarea
                  name="message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows="6"
                  required
                  className="admin-textarea"
                  placeholder="Tell me about your project..."
                />
              </label>
              <button className="btn-primary w-fit" type="submit">
                <Send size={18} /> Submit Message
              </button>
              {status && <p className="text-sm font-bold text-slate-600">{status}</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, value, onChange, type = "text" }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <input
        required
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange((prev) => ({ ...prev, [name]: e.target.value }))}
        className="admin-input"
      />
    </label>
  );
}
