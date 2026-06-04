import { useEffect, useState } from "react";
import { listenProfile, listenProjects } from "../services/dataService";
import { defaultProfile, defaultProjects } from "../data/defaultData";

export function useProfile() {
  const [profile, setProfile] = useState(defaultProfile);
  useEffect(() => listenProfile(setProfile), []);
  return profile;
}

export function useProjects() {
  const [projects, setProjects] = useState(defaultProjects);
  useEffect(() => listenProjects(setProjects), []);
  return projects;
}
