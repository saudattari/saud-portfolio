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
      const ok = localStorage.getItem(DEMO_AUTH_KEY) === "true";
      if (!ok) navigate("/admin");
      return;
    }

    return onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/admin");
    });
  }, [navigate]);

  useEffect(() => setProfileForm(profile), [profile]);

  const previewScreens = useMemo(
    () => normalize(projectForm.screenshots),
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
    setStatus("Profile updated successfully.");
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
    if (!confirm("Delete this project?")) return;
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

  async function uploadProfilePhoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const url = await uploadFile(file, "profile");
    setProfileForm((p) => ({ ...p, photoUrl: url }));
    setIsUploading(false);
  }

  async function uploadHeader(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const url = await uploadFile(file, "project-headers");
    setProjectForm((p) => ({ ...p, headerImage: url }));
    setIsUploading(false);
  }

  async function uploadScreenshots(e) {
    const files = Array.from(e.target.files || []);
    setIsUploading(true);

    const urls = [];
    for (const f of files) {
      urls.push(await uploadFile(f, "screenshots"));
    }

    setProjectForm((p) => ({
      ...p,
      screenshots: [...normalize(p.screenshots), ...urls].join("\n"),
    }));

    setIsUploading(false);
  }

  return (
    <section className="min-h-screen bg-slate-50 py-10">
      <div className="container-custom space-y-8">

        {/* HEADER */}
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-indigo-600">
              ADMIN PANEL
            </p>
            <h1 className="text-3xl font-black text-slate-900">
              Portfolio Dashboard
            </h1>
            <p className="text-sm text-slate-500">
              Manage profile, projects, and content
            </p>
          </div>

          <button
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {/* STATUS */}
        {(status || error || isUploading) && (
          <div className="space-y-2">
            {status && (
              <p className="rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-700">
                {status}
              </p>
            )}
            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            )}
            {isUploading && (
              <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700">
                Uploading image...
              </p>
            )}
          </div>
        )}

        {/* TOP INFO CARDS */}
        <div className="grid gap-4 md:grid-cols-4">
          <Info title="Mode" value={hasFirebaseConfig ? "Firebase" : "Demo"} />
          <Info title="Storage" value={hasCloudinaryConfig ? "Cloudinary" : "Local"} />
          <Info title="Email" value={demoAdmin.email} />
          <Info title="Password" value={demoAdmin.password} />
        </div>

        {/* MAIN GRID */}
        <div className="grid gap-8 xl:grid-cols-2">

          {/* PROFILE */}
          <Panel title="Profile Settings" icon={<UserRound size={18} />}>
            <div className="grid gap-4">
              <Input label="Name" value={profileForm.name} onChange={(v) => setProfileForm({ ...profileForm, name: v })} />
              <Input label="Role" value={profileForm.role} onChange={(v) => setProfileForm({ ...profileForm, role: v })} />
              <Input label="Email" value={profileForm.email} onChange={(v) => setProfileForm({ ...profileForm, email: v })} />
              <Input label="Photo URL" value={profileForm.photoUrl} onChange={(v) => setProfileForm({ ...profileForm, photoUrl: v })} />

              <File upload="Upload Photo" onChange={uploadProfilePhoto} />

              <textarea
                className="input"
                rows={4}
                value={profileForm.description}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, description: e.target.value })
                }
                placeholder="Bio"
              />
            </div>

            <button className="btn-primary mt-6">
              <Save size={16} /> Save Profile
            </button>
          </Panel>

          {/* PROJECT */}
          <Panel title="Project Editor" icon={<PencilLine size={18} />}>
            <div className="grid gap-4">
              <Input label="Title" value={projectForm.title} onChange={(v) => setProjectForm({ ...projectForm, title: v })} />
              <Input label="Category" value={projectForm.category} onChange={(v) => setProjectForm({ ...projectForm, category: v })} />
              <Input label="Link" value={projectForm.appLink} onChange={(v) => setProjectForm({ ...projectForm, appLink: v })} />

              <textarea
                className="input"
                rows={3}
                value={projectForm.shortDescription}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, shortDescription: e.target.value })
                }
                placeholder="Short description"
              />

              <File upload="Header Image" onChange={uploadHeader} />
              <File upload="Screenshots" multiple onChange={uploadScreenshots} />
            </div>

            <button className="btn-dark mt-6">
              <Plus size={16} /> Save Project
            </button>
          </Panel>
        </div>

        {/* PROJECT LIST */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Existing Projects
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden"
              >
                <img src={p.headerImage} className="h-40 w-full object-cover" />

                <div className="p-4">
                  <h3 className="font-bold">{p.title}</h3>
                  <p className="text-sm text-slate-500">{p.category}</p>

                  <div className="mt-4 flex gap-2">
                    <button onClick={() => handleEdit(p)} className="btn-outline text-xs">
                      Edit
                    </button>
                    <button onClick={() => handleRemove(p.id)} className="btn-danger text-xs">
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

/* ================= UI COMPONENTS ================= */

function Panel({ title, icon, children }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2 font-bold text-slate-900">
        {icon} {title}
      </div>
      {children}
    </div>
  );
}

function Info({ title, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
      <p className="text-xs font-bold text-slate-500">{title}</p>
      <p className="mt-1 font-bold text-slate-900">{value}</p>
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input
        className="input"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function File({ upload, onChange, multiple }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3 text-sm text-slate-600">
      <UploadCloud size={16} />
      {upload}
      <input type="file" multiple={multiple} className="hidden" onChange={onChange} />
    </label>
  );
}

function normalize(v) {
  return String(v || "")
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);
}