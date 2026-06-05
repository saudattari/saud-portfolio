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
  LayoutDashboard,
  FolderPlus,
  User,
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

  const [activeTab, setActiveTab] = useState("dashboard");

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
    setError("");
    setStatus("Saving profile...");
    try {
      await saveProfile(profileForm);
      setStatus("Profile updated successfully.");
    } catch (err) {
      setError(err?.message || "Failed to save profile.");
      setStatus("");
    }
  }

  async function handleProjectSave(e) {
    e.preventDefault();
    setError("");
    setStatus("Saving project...");
    try {
      await saveProject({
        ...projectForm,
        id: projectForm.id || slugify(projectForm.title),
      });
      setProjectForm(emptyProject);
      setStatus("Project saved successfully.");
    } catch (err) {
      setError(err?.message || "Failed to save project.");
      setStatus("");
    }
  }

  async function handleRemove(id) {
    const ok = window.confirm("Delete this project?");
    if (!ok) return;
    await removeProject(id);
    setStatus("Project deleted.");
  }

  function handleEdit(project) {
  setProjectForm({
    ...project,
    screenshots: normalizeMultiline(project.screenshots).join("\n"),
    technologies: normalizeMultiline(project.technologies).join("\n"),
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
    if (!files.length) return;
    setIsUploading(true);

    const urls = [];
    for (const file of files) {
      urls.push(await uploadFile(file, "project-screenshots"));
    }

    setProjectForm((p) => ({
      ...p,
      screenshots: [...normalizeMultiline(p.screenshots), ...urls].join("\n"),
    }));

    setIsUploading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex">

      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-slate-200 p-6 hidden md:flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">
            Portfolio Admin
          </h1>

          <nav className="mt-8 space-y-2">
            <SidebarItem
              icon={<LayoutDashboard size={18} />}
              label="Dashboard"
              active={activeTab === "dashboard"}
              onClick={() => setActiveTab("dashboard")}
            />
            <SidebarItem
              icon={<User size={18} />}
              label="Profile"
              active={activeTab === "profile"}
              onClick={() => setActiveTab("profile")}
            />
            <SidebarItem
              icon={<FolderPlus size={18} />}
              label="Projects"
              active={activeTab === "projects"}
              onClick={() => setActiveTab("projects")}
            />
          </nav>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 text-red-600 font-bold"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6 md:p-10">

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-black text-slate-900">
              {activeTab === "dashboard" && "Dashboard"}
              {activeTab === "profile" && "Profile Settings"}
              {activeTab === "projects" && "Project Manager"}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Manage your portfolio content professionally
            </p>
          </div>
        </div>

        {status && <Alert type="info" text={status} />}
        {error && <Alert type="error" text={error} />}
        {isUploading && <Alert type="warning" text="Uploading files..." />}

        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoCard title="Data Mode" value={hasFirebaseConfig ? "Firebase Live" : "Demo Mode"} />
            <InfoCard title="Image Upload" value={hasCloudinaryConfig ? "Cloudinary ON" : "Manual Mode"} />
            <InfoCard title="Demo Email" value={demoAdmin.email} />
            <InfoCard title="Demo Password" value={demoAdmin.password} />
          </div>
        )}

        {/* PROFILE */}
        {activeTab === "profile" && (
          <form onSubmit={handleProfileSave} className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
            <SectionTitle title="Profile Information" />

            <Input label="Name" value={profileForm.name} onChange={(v) => setProfileForm({ ...profileForm, name: v })} />
            <Input label="Role" value={profileForm.role} onChange={(v) => setProfileForm({ ...profileForm, role: v })} />
            <Input label="Email" value={profileForm.email} onChange={(v) => setProfileForm({ ...profileForm, email: v })} />

            <FileInput label="Profile Image" onChange={uploadProfilePhoto} />

            <button className="btn-primary flex items-center gap-2">
              <Save size={18} /> Save Profile
            </button>
          </form>
        )}

        {/* PROJECTS */}
        {activeTab === "projects" && (
          <div className="grid lg:grid-cols-2 gap-6">

            {/* FORM */}
            {/* FORM */}
<form onSubmit={handleProjectSave} className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
  <SectionTitle title="Add / Edit Project" />

  <Input
    label="Title"
    value={projectForm.title}
    onChange={(v) => setProjectForm({ ...projectForm, title: v })}
  />

  <Input
    label="Category"
    value={projectForm.category}
    onChange={(v) => setProjectForm({ ...projectForm, category: v })}
  />

  {/* ✅ FIXED: Project URL / Play Store */}
  <Input
    label="Project URL (Play Store / Website / GitHub)"
    value={projectForm.appLink}
    onChange={(v) => setProjectForm({ ...projectForm, appLink: v })}
    placeholder="https://play.google.com/store/apps/... or https://github.com/..."
  />

  <FileInput label="Header Image" onChange={uploadHeader} />

  <TextArea
    label="Short Description"
    value={projectForm.shortDescription}
    onChange={(v) => setProjectForm({ ...projectForm, shortDescription: v })}
  />

  <TextArea
    label="Description"
    value={projectForm.description}
    onChange={(v) => setProjectForm({ ...projectForm, description: v })}
  />

  {/* ✅ FIXED: Technologies */}
  <TextArea
    label="Technologies (comma or line separated)"
    value={projectForm.technologies}
    onChange={(v) => setProjectForm({ ...projectForm, technologies: v })}
    placeholder="Kotlin, Jetpack Compose, Firebase, Room DB"
  />

  {/* 🔥 TECH PREVIEW (chips UI) */}
  {projectForm.technologies && (
    <div className="flex flex-wrap gap-2">
      {normalizeMultiline(projectForm.technologies).map((tech, i) => (
        <span
          key={i}
          className="px-3 py-1 text-xs font-bold rounded-full bg-slate-100 border"
        >
          {tech}
        </span>
      ))}
    </div>
  )}

  <FileInput label="Screenshots" multiple onChange={uploadScreenshots} />

  <button className="btn-dark flex items-center gap-2">
    <Plus size={18} /> Save Project
  </button>
</form>

            {/* LIST */}
            <div className="space-y-4">
              {projects.map((p) => (
                <div key={p.id} className="bg-white border rounded-2xl p-4 shadow-sm">
                  <img src={p.headerImage} className="h-40 w-full object-cover rounded-xl" />

                  <h3 className="font-bold mt-3">{p.title}</h3>
                  <p className="text-sm text-slate-500">{p.category}</p>

                  <div className="flex gap-2 mt-3">
                    <button onClick={() => handleEdit(p)} className="btn-outline">
                      <PencilLine size={14} /> Edit
                    </button>
                    <button onClick={() => handleRemove(p.id)} className="text-red-600 font-bold">
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </main>
    </div>
  );
}

/* ---------------- UI COMPONENTS ---------------- */

function SidebarItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-2 rounded-xl text-sm font-bold transition ${
        active ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function SectionTitle({ title }) {
  return <h3 className="text-lg font-black text-slate-900">{title}</h3>;
}

function Alert({ type, text }) {
  const color =
    type === "error"
      ? "bg-red-50 text-red-600"
      : type === "warning"
      ? "bg-amber-50 text-amber-700"
      : "bg-blue-50 text-blue-600";

  return <div className={`p-3 rounded-xl mb-4 font-bold text-sm ${color}`}>{text}</div>;
}

function InfoCard({ title, value }) {
  return (
    <div className="bg-white border rounded-2xl p-5 shadow-sm">
      <p className="text-xs font-bold text-slate-400">{title}</p>
      <p className="text-lg font-black mt-2">{value}</p>
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <label className="block text-sm font-bold">
      {label}
      <input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-300"
      />
    </label>
  );
}

function TextArea({ label, value, onChange }) {
  return (
    <label className="block text-sm font-bold">
      {label}
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 p-3 border rounded-xl min-h-[100px]"
      />
    </label>
  );
}

function FileInput({ label, onChange, multiple }) {
  return (
    <label className="block text-sm font-bold">
      {label}
      <input type="file" multiple={multiple} onChange={onChange} className="mt-2" />
    </label>
  );
}

function normalizeMultiline(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  return String(value || "")
    .split("\n")
    .map((v) => v.trim())
    .filter(Boolean);
}