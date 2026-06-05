import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  ImagePlus,
  LogOut,
  PencilLine,
  Plus,
  Save,
  Trash2,
  UploadCloud,
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
  uploadFile,
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

export default function AdminDashboard() {
  const navigate = useNavigate();
  const profile = useProfile();
  const projects = useProjects();

  const [profileForm, setProfileForm] = useState(defaultProfile);
  const [projectForm, setProjectForm] = useState(emptyProject);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!hasFirebaseConfig) {
      const isLoggedIn = localStorage.getItem(DEMO_AUTH_KEY) === "true";
      if (!isLoggedIn) navigate("/admin");
      return;
    }

    return onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/admin");
    });
  }, [navigate]);

  useEffect(() => {
    setProfileForm(profile);
  }, [profile]);

  const previewScreens = useMemo(
    () => normalizeMultiline(projectForm.screenshots),
    [projectForm.screenshots]
  );

  async function logout() {
    if (!hasFirebaseConfig) {
      localStorage.removeItem(DEMO_AUTH_KEY);
      navigate("/admin");
      return;
    }
    await signOut(auth);
    navigate("/admin");
  }

  async function handleProfileSave(e) {
    e.preventDefault();
    setStatus("Saving profile...");
    await saveProfile(profileForm);
    setStatus("Profile saved successfully.");
  }

  async function handleProjectSave(e) {
    e.preventDefault();
    setStatus("Saving project...");

    await saveProject({
      ...projectForm,
      id: projectForm.id || slugify(projectForm.title),
    });

    setProjectForm(emptyProject);
    setStatus("Project saved successfully.");
  }

  async function handleRemove(id) {
    if (!window.confirm("Delete this project?")) return;
    await removeProject(id);
    setStatus("Project deleted.");
  }

  function handleEdit(project) {
    setProjectForm({
      ...project,
      screenshots: (project.screenshots || []).join("\n"),
      technologies: (project.technologies || []).join("\n"),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <section className="min-h-screen bg-slate-50 py-10 md:py-14">
      <div className="container-custom">

        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Admin Dashboard
            </p>
            <h1 className="mt-1 text-3xl font-black text-slate-900">
              Manage Portfolio
            </h1>
          </div>

          <button
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* STATUS */}
        {status && (
          <p className="mb-4 rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-700">
            {status}
          </p>
        )}

        {error && (
          <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* GRID FOR FORMS */}
        <div className="grid gap-8 xl:grid-cols-2">

          {/* PROFILE */}
          <Card title="Profile Settings" icon={<UserRound size={18} />}>
            <FormGroup>
              <Input label="Name" value={profileForm.name} onChange={(v) => setProfileForm({ ...profileForm, name: v })} />
              <Input label="Role" value={profileForm.role} onChange={(v) => setProfileForm({ ...profileForm, role: v })} />
              <Input label="Email" value={profileForm.email} onChange={(v) => setProfileForm({ ...profileForm, email: v })} />
              <Input label="Photo URL" value={profileForm.photoUrl} onChange={(v) => setProfileForm({ ...profileForm, photoUrl: v })} />
            </FormGroup>

            <button className="mt-6 w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-slate-800">
              <Save size={16} /> Save Profile
            </button>
          </Card>

          {/* PROJECT */}
          <Card title="Project Editor" icon={<PencilLine size={18} />}>
            <FormGroup>
              <Input label="Title" value={projectForm.title} onChange={(v) => setProjectForm({ ...projectForm, title: v })} />
              <Input label="Category" value={projectForm.category} onChange={(v) => setProjectForm({ ...projectForm, category: v })} />
              <Input label="Link" value={projectForm.appLink} onChange={(v) => setProjectForm({ ...projectForm, appLink: v })} />
            </FormGroup>

            <textarea
              className="mt-4 w-full rounded-xl border border-slate-200 p-3 text-sm focus:ring-4 focus:ring-indigo-100"
              rows={4}
              placeholder="Short Description"
              value={projectForm.shortDescription}
              onChange={(e) =>
                setProjectForm({ ...projectForm, shortDescription: e.target.value })
              }
            />

            <button className="mt-6 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700">
              <Plus size={16} /> Save Project
            </button>
          </Card>
        </div>

        {/* PROJECT LIST */}
        <div className="mt-10">
          <h2 className="mb-6 text-xl font-bold text-slate-900">
            Existing Projects
          </h2>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((p) => (
              <div
                key={p.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <img
                  src={p.headerImage}
                  className="h-40 w-full object-cover"
                  alt=""
                />

                <div className="p-4">
                  <h3 className="font-bold text-slate-900">{p.title}</h3>
                  <p className="text-sm text-slate-500">{p.category}</p>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="rounded-lg border px-3 py-1 text-xs font-semibold hover:bg-slate-50"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleRemove(p.id)}
                      className="rounded-lg bg-red-50 px-3 py-1 text-xs font-semibold text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

/* ===== UI COMPONENTS ===== */

function Card({ title, icon, children }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2 text-slate-900">
        {icon}
        <h3 className="font-bold">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function FormGroup({ children }) {
  return <div className="space-y-4">{children}</div>;
}

function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:ring-4 focus:ring-indigo-100"
      />
    </div>
  );
}

function normalizeMultiline(v) {
  return String(v || "")
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);
}