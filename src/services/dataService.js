import { collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import { db, hasFirebaseConfig } from "./firebase";
import { uploadToCloudinary, hasCloudinaryConfig } from "./cloudinary";
import { defaultProfile, defaultProjects } from "../data/defaultData";

const PROFILE_KEY = "portfolio_profile";
const PROJECTS_KEY = "portfolio_projects";
const DATA_EVENT = "portfolio-data-updated";

function getLocalProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? { ...defaultProfile, ...JSON.parse(raw) } : defaultProfile;
  } catch {
    return defaultProfile;
  }
}

function getLocalProjects() {
  try {
    const raw = localStorage.getItem(PROJECTS_KEY);
    return raw ? JSON.parse(raw) : defaultProjects;
  } catch {
    return defaultProjects;
  }
}

function saveLocalProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  window.dispatchEvent(new Event(DATA_EVENT));
}

function saveLocalProjects(projects) {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  window.dispatchEvent(new Event(DATA_EVENT));
}

export function listenProfile(callback) {
  if (!hasFirebaseConfig) {
    callback(getLocalProfile());
    const handler = () => callback(getLocalProfile());
    window.addEventListener(DATA_EVENT, handler);
    return () => window.removeEventListener(DATA_EVENT, handler);
  }

  return onSnapshot(doc(db, "site", "profile"), (snapshot) => {
    callback(snapshot.exists() ? { ...defaultProfile, ...snapshot.data() } : defaultProfile);
  });
}

export function listenProjects(callback) {
  if (!hasFirebaseConfig) {
    callback(getLocalProjects());
    const handler = () => callback(getLocalProjects());
    window.addEventListener(DATA_EVENT, handler);
    return () => window.removeEventListener(DATA_EVENT, handler);
  }

  const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
    callback(items.length ? items : defaultProjects);
  });
}

export async function saveProfile(profile) {
  if (!hasFirebaseConfig) {
    saveLocalProfile({ ...profile, updatedAt: new Date().toISOString() });
    return;
  }

  await setDoc(doc(db, "site", "profile"), { ...profile, updatedAt: serverTimestamp() }, { merge: true });
}

export async function saveProject(project) {
  const id = project.id || slugify(project.title);
  const normalized = {
    ...project,
    id,
    technologies: normalizeArray(project.technologies),
    screenshots: normalizeArray(project.screenshots)
  };

  if (!hasFirebaseConfig) {
    const existing = getLocalProjects();
    const index = existing.findIndex((item) => item.id === id);
    const payload = {
      ...normalized,
      createdAt: existing[index]?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    if (index >= 0) existing[index] = payload;
    else existing.unshift(payload);
    saveLocalProjects(existing);
    return;
  }

  await setDoc(doc(db, "projects", id), {
    ...normalized,
    updatedAt: serverTimestamp(),
    createdAt: project.createdAt || serverTimestamp()
  }, { merge: true });
}

export async function removeProject(id) {
  if (!hasFirebaseConfig) {
    const items = getLocalProjects().filter((item) => item.id !== id);
    saveLocalProjects(items);
    return;
  }

  await deleteDoc(doc(db, "projects", id));
}

export async function uploadFile(file, folder = "portfolio") {
  if (!file) return "";

  if (hasCloudinaryConfig) {
    return uploadToCloudinary(file, folder);
  }

  if (!hasFirebaseConfig) {
    return fileToDataUrl(file);
  }

  throw new Error(
    "Image upload needs Cloudinary config. Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env, or paste image URLs manually."
  );
}

export function slugify(value) {
  return String(value || "project")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeArray(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  return String(value || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
