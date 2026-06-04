import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  ImagePlus,
  LogOut,
  PencilLine,
  Plus,
  Save,
  Trash2,
  UploadCloud,
  UserRound
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { defaultProfile, demoAdmin } from "../data/defaultData";
import { removeProject, saveProfile, saveProject, slugify, uploadFile } from "../services/dataService";
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
  featured: true
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

  const previewScreens = useMemo(() => normalizeMultiline(projectForm.screenshots), [projectForm.screenshots]);

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
      setStatus("Profile saved successfully.");
    } catch (err) {
      setStatus("");
      setError(err?.message || "Failed to save profile.");
    }
  }

  async function handleProjectSave(e) {
    e.preventDefault();
    setError("");
    setStatus("Saving project...");
    try {
      await saveProject({
        ...projectForm,
        id: projectForm.id || slugify(projectForm.title)
      });
      setProjectForm(emptyProject);
      setStatus("Project saved successfully.");
    } catch (err) {
      setStatus("");
      setError(err?.message || "Failed to save project.");
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
      screenshots: (project.screenshots || []).join("\n"),
      technologies: (project.technologies || []).join("\n")
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function uploadProfilePhoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const url = await uploadFile(file, "profile");
    setProfileForm((prev) => ({ ...prev, photoUrl: url }));
    setIsUploading(false);
  }

  async function uploadHeader(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const url = await uploadFile(file, "project-headers");
    setProjectForm((prev) => ({ ...prev, headerImage: url }));
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
    setProjectForm((prev) => ({
      ...prev,
      screenshots: [...normalizeMultiline(prev.screenshots), ...urls].join("\n")
    }));
    setIsUploading(false);
  }

  return (
    <section className="py-10 md:py-14">
      <div className="container-custom">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-[34px] border border-slate-200 bg-white p-6 shadow-soft md:p-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-primary">Admin Dashboard</p>
            <h1 className="mt-2 text-3xl font-black text-ink md:text-4xl">Manage portfolio content</h1>
            <p className="mt-3 max-w-3xl leading-7 text-slate-600">
              Update profile, add projects, upload screenshots, edit project details, and keep your website updated.
            </p>
          </div>
          <button onClick={logout} className="btn-outline">
            <LogOut size={18} /> Logout
          </button>
        </div>

        <div className="mb-6 grid gap-4 lg:grid-cols-3">
          <InfoCard title="Data Mode" value={hasFirebaseConfig ? "Firebase Live Mode" : "Demo Local Mode"} />
          <InfoCard title="Image Upload" value={hasCloudinaryConfig ? "Cloudinary Enabled" : "Cloudinary Not Configured"} />
          <InfoCard title="Demo Email" value={demoAdmin.email} />
          <InfoCard title="Demo Password" value={demoAdmin.password} />
        </div>

        {status && <p className="mb-6 rounded-2xl bg-blue-50 px-4 py-3 text-sm font-bold text-primary">{status}</p>}
        {error && <p className="mb-6 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{error}</p>}
        {!hasCloudinaryConfig && <p className="mb-6 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-bold text-amber-700">Cloudinary is not configured. Upload buttons will use demo localStorage only in demo mode, or fail in Firebase mode. You can still paste image URLs manually.</p>}
        {isUploading && <p className="mb-6 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-bold text-amber-700">Uploading image...</p>}

        <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <form onSubmit={handleProfileSave} className="rounded-[34px] border border-slate-200 bg-white p-6 shadow-soft md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="mock-icon h-14 w-14 text-primary"><UserRound size={24} /></div>
              <div>
                <h2 className="text-2xl font-black text-ink">Profile Settings</h2>
                <p className="text-sm text-slate-500">These values appear on the public website.</p>
              </div>
            </div>

            <div className="grid gap-4">
              <Input label="Name" value={profileForm.name} onChange={(value) => setProfileForm({ ...profileForm, name: value })} />
              <Input label="Role" value={profileForm.role} onChange={(value) => setProfileForm({ ...profileForm, role: value })} />
              <Input label="Email" value={profileForm.email} onChange={(value) => setProfileForm({ ...profileForm, email: value })} />
              <Input label="Form Receiver Email" value={profileForm.formReceiver} onChange={(value) => setProfileForm({ ...profileForm, formReceiver: value })} />
              <Input label="Photo URL" value={profileForm.photoUrl} onChange={(value) => setProfileForm({ ...profileForm, photoUrl: value })} />
              <FileInput label="Upload Profile Image" onChange={uploadProfilePhoto} />
              <TextArea label="Headline / Bio" value={profileForm.description} onChange={(value) => setProfileForm({ ...profileForm, description: value })} />
              <div className="grid gap-4 sm:grid-cols-3">
                <Input label="Experience" value={profileForm.years} onChange={(value) => setProfileForm({ ...profileForm, years: value })} />
                <Input label="Apps Built" value={profileForm.apps} onChange={(value) => setProfileForm({ ...profileForm, apps: value })} />
                <Input label="Clients" value={profileForm.clients} onChange={(value) => setProfileForm({ ...profileForm, clients: value })} />
              </div>
              <button className="btn-primary w-fit" type="submit">
                <Save size={18} /> Save Profile
              </button>
            </div>
          </form>

          <form onSubmit={handleProjectSave} className="rounded-[34px] border border-slate-200 bg-white p-6 shadow-soft md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="mock-icon h-14 w-14 text-cyan-500"><PencilLine size={24} /></div>
              <div>
                <h2 className="text-2xl font-black text-ink">Add / Edit Project</h2>
                <p className="text-sm text-slate-500">Add title, link, images, screenshots, and technologies.</p>
              </div>
            </div>

            <div className="grid gap-4">
              <Input label="Project ID / Slug" value={projectForm.id} onChange={(value) => setProjectForm({ ...projectForm, id: value })} placeholder="auto-generated if empty" />
              <Input label="Project Title" value={projectForm.title} onChange={(value) => setProjectForm({ ...projectForm, title: value })} />
              <Input label="Category" value={projectForm.category} onChange={(value) => setProjectForm({ ...projectForm, category: value })} />
              <Input label="Project Link" value={projectForm.appLink} onChange={(value) => setProjectForm({ ...projectForm, appLink: value })} placeholder="Play Store or website link" />
              <Input label="Header Image URL" value={projectForm.headerImage} onChange={(value) => setProjectForm({ ...projectForm, headerImage: value })} />
              <FileInput label="Upload Header Image" onChange={uploadHeader} />
              <TextArea label="Short Description" value={projectForm.shortDescription} onChange={(value) => setProjectForm({ ...projectForm, shortDescription: value })} />
              <TextArea label="Full Description" value={projectForm.description} onChange={(value) => setProjectForm({ ...projectForm, description: value })} />
              <TextArea label="Technologies (one per line)" value={projectForm.technologies} onChange={(value) => setProjectForm({ ...projectForm, technologies: value })} />
              <TextArea label="Screenshot URLs (one per line)" value={projectForm.screenshots} onChange={(value) => setProjectForm({ ...projectForm, screenshots: value })} />
              <FileInput label="Upload Screenshots" onChange={uploadScreenshots} multiple />
              <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={Boolean(projectForm.featured)}
                  onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                />
                Featured project
              </label>
              <button className="btn-dark w-fit" type="submit">
                <Plus size={18} /> Save Project
              </button>
            </div>

            {(projectForm.headerImage || previewScreens.length > 0) && (
              <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-black text-ink">Project Preview</h3>
                {projectForm.headerImage && (
                  <img src={projectForm.headerImage} alt="Header preview" className="mt-4 h-52 w-full rounded-[24px] object-cover bg-white" />
                )}
                {previewScreens.length > 0 && (
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {previewScreens.slice(0, 4).map((screen, index) => (
                      <img key={screen + index} src={screen} alt={`preview ${index + 1}`} className="h-52 w-full rounded-[22px] object-cover bg-white" />
                    ))}
                  </div>
                )}
              </div>
            )}
          </form>
        </div>

        <div className="mt-8 rounded-[34px] border border-slate-200 bg-white p-6 shadow-soft md:p-8">
          <h2 className="text-2xl font-black text-ink">Existing Projects</h2>
          <p className="mt-2 text-slate-600">Click edit to load project details into the form above.</p>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <div key={project.id} className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50">
                <img src={project.headerImage} alt={project.title} className="h-48 w-full object-cover bg-white" />
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-black text-ink">{project.title}</h3>
                    {project.featured && <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-black text-cyan-700">Featured</span>}
                  </div>
                  <p className="mt-1 text-sm font-semibold text-primary">{project.category}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{project.shortDescription}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button onClick={() => handleEdit(project)} type="button" className="btn-outline text-sm">
                      <PencilLine size={16} /> Edit
                    </button>
                    <button onClick={() => handleRemove(project.id)} type="button" className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
                      <Trash2 size={16} /> Delete
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

function normalizeMultiline(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  return String(value || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function InfoCard({ title, value }) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">{title}</p>
      <p className="mt-2 text-lg font-black text-ink">{value}</p>
    </div>
  );
}

function Input({ label, value, onChange, placeholder = "" }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <input value={value || ""} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="admin-input" />
    </label>
  );
}

function TextArea({ label, value, onChange }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <textarea value={value || ""} onChange={(e) => onChange(e.target.value)} className="admin-textarea" />
    </label>
  );
}

function FileInput({ label, onChange, multiple = false }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <span className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-slate-500">
        {multiple ? <UploadCloud size={18} /> : <ImagePlus size={18} />}
        Choose file{multiple ? "s" : ""}
        <input type="file" accept="image/*" multiple={multiple} onChange={onChange} className="hidden" />
      </span>
    </label>
  );
}
