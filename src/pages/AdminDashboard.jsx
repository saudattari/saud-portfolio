import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  LogOut,
  Save,
  Plus,
  Trash2,
  PencilLine,
  UserRound,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { defaultProfile, demoAdmin } from "../data/defaultData";
import {
  removeProject,
  saveProfile,
  saveProject,
  slugify,
} from "../services/dataService";
import { auth, hasFirebaseConfig } from "../services/firebase";
import { hasCloudinaryConfig } from "../services/cloudinary";
import { useProfile, useProjects } from "../utils/useSiteData";

const DEMO_AUTH_KEY = "portfolio_admin_logged_in";

const emptyProject = {
  id: "",
  title: "",
  category: "",
  shortDescription: "",
  description: "",
  appLink: "",
  headerImage: "",
  screenshots: "",
  technologies: "",
  featured: true,
};

/* ===================== MAIN DASHBOARD ===================== */

export default function AdminDashboard() {
  const navigate = useNavigate();
  const profile = useProfile();
  const projects = useProjects();

  const [profileForm, setProfileForm] = useState(defaultProfile);
  const [projectForm, setProjectForm] = useState(emptyProject);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!hasFirebaseConfig) {
      const ok = localStorage.getItem(DEMO_AUTH_KEY) === "true";
      if (!ok) navigate("/admin");
      return;
    }

    return onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/admin");
    });
  }, [navigate]);

  useEffect(() => setProfileForm(profile), [profile]);

  async function logout() {
    if (!hasFirebaseConfig) {
      localStorage.removeItem(DEMO_AUTH_KEY);
      navigate("/admin");
      return;
    }
    await signOut(auth);
    navigate("/admin");
  }

  async function saveProfileData(e) {
    e.preventDefault();
    setStatus("Saving profile...");
    await saveProfile(profileForm);
    setStatus("Profile updated successfully");
  }

  async function saveProjectData(e) {
    e.preventDefault();
    setStatus("Saving project...");

    await saveProject({
      ...projectForm,
      id: projectForm.id || slugify(projectForm.title),
    });

    setProjectForm(emptyProject);
    setStatus("Project saved successfully");
  }

  async function deleteProject(id) {
    if (!confirm("Delete this project permanently?")) return;
    await removeProject(id);
    setStatus("Project deleted");
  }

  const preview = projectForm;

  return (
    <div className="h-screen flex flex-col bg-slate-50 text-slate-900">

      {/* ================= TOP BAR ================= */}
      <div className="flex items-center justify-between border-b bg-white px-6 py-3">
        <div>
          <h1 className="text-lg font-bold">Admin Dashboard</h1>
          <p className="text-xs text-slate-500">
            Portfolio Management System
          </p>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-slate-50"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>

      {/* ================= MAIN AREA ================= */}
      <div className="flex flex-1 overflow-hidden">

        {/* ========== LEFT PANEL ========== */}
        <div className="w-72 border-r bg-white p-4 space-y-5">

          <SectionTitle>System Status</SectionTitle>

          <Info label="Mode" value={hasFirebaseConfig ? "Live" : "Demo"} />
          <Info label="Storage" value={hasCloudinaryConfig ? "Cloudinary" : "Local"} />
          <Info label="Admin Email" value={demoAdmin.email} />

          <div className="pt-4 border-t space-y-2">
            <SectionTitle>Quick Actions</SectionTitle>

            <button className="btn-soft w-full">+ New Project</button>
            <button className="btn-soft w-full">Edit Profile</button>
          </div>

        </div>

        {/* ========== CENTER WORKSPACE ========== */}
        <div className="flex-1 overflow-auto p-6 space-y-6">

          {/* ===== PROFILE EDITOR ===== */}
          <Panel title="Profile Editor" icon={<UserRound size={16} />}>
            <Section title="Identity">
              <Grid>
                <Field label="Name" value={profileForm.name}
                  onChange={(v) => setProfileForm({ ...profileForm, name: v })} />

                <Field label="Role" value={profileForm.role}
                  onChange={(v) => setProfileForm({ ...profileForm, role: v })} />
              </Grid>
            </Section>

            <Section title="Contact">
              <Grid>
                <Field label="Email" value={profileForm.email}
                  onChange={(v) => setProfileForm({ ...profileForm, email: v })} />

                <Field label="Form Receiver" value={profileForm.formReceiver}
                  onChange={(v) => setProfileForm({ ...profileForm, formReceiver: v })} />
              </Grid>
            </Section>

            <Section title="Bio">
              <textarea
                className="field h-28"
                value={profileForm.description}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, description: e.target.value })
                }
              />
            </Section>

            <button onClick={saveProfileData} className="btn-primary mt-4">
              <Save size={16} /> Save Profile
            </button>
          </Panel>

          {/* ===== PROJECT EDITOR ===== */}
          <Panel title="Project Editor" icon={<PencilLine size={16} />}>
            <Grid>
              <Field label="Title" value={projectForm.title}
                onChange={(v) => setProjectForm({ ...projectForm, title: v })} />

              <Field label="Category" value={projectForm.category}
                onChange={(v) => setProjectForm({ ...projectForm, category: v })} />
            </Grid>

            <Grid>
              <Field label="Project Link" value={projectForm.appLink}
                onChange={(v) => setProjectForm({ ...projectForm, appLink: v })} />

              <Field label="Header Image" value={projectForm.headerImage}
                onChange={(v) => setProjectForm({ ...projectForm, headerImage: v })} />
            </Grid>

            <Section title="Description">
              <textarea
                className="field h-24"
                value={projectForm.shortDescription}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    shortDescription: e.target.value,
                  })
                }
              />
            </Section>

            <button onClick={saveProjectData} className="btn-dark mt-4">
              <Plus size={16} /> Save Project
            </button>
          </Panel>

        </div>

        {/* ========== RIGHT INSPECTOR ========== */}
        <div className="w-80 border-l bg-white p-4 space-y-4">

          <SectionTitle>Live Preview</SectionTitle>

          {preview.headerImage && (
            <img
              src={preview.headerImage}
              className="rounded-xl border object-cover"
            />
          )}

          <div className="space-y-1">
            <p className="font-bold">{preview.title || "Project Title"}</p>
            <p className="text-xs text-slate-500">{preview.category}</p>
            <p className="text-sm text-slate-600">
              {preview.shortDescription}
            </p>
          </div>

          <div className="border-t pt-3">
            <SectionTitle>Status</SectionTitle>
            <p className="text-xs text-slate-500">{status}</p>
          </div>

        </div>

      </div>

      {/* ========== DATABASE TABLE ========== */}
      <div className="border-t bg-white p-5">

        <SectionTitle>Projects Database</SectionTitle>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3 mt-4">

          {projects.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-3 border rounded-lg p-3"
            >
              <img
                src={p.headerImage}
                className="h-10 w-10 rounded object-cover"
              />

              <div className="flex-1">
                <p className="font-bold text-sm">{p.title}</p>
                <p className="text-xs text-slate-500">{p.category}</p>
              </div>

              <button
                onClick={() => deleteProject(p.id)}
                className="text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

/* ================= UI SYSTEM ================= */

function Panel({ title, icon, children }) {
  return (
    <div className="border rounded-xl bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 font-bold mb-3">
        {icon} {title}
      </div>
      {children}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-4">
      <p className="text-xs font-bold text-slate-500 uppercase mb-2">
        {title}
      </p>
      {children}
    </div>
  );
}

function Grid({ children }) {
  return <div className="grid grid-cols-2 gap-3">{children}</div>;
}

function Field({ label, value, onChange }) {
  return (
    <div>
      <label className="text-xs text-slate-500">{label}</label>
      <input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="field"
      />
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="border rounded-lg p-2">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-sm font-bold">{value}</p>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
      {children}
    </h3>
  );
}