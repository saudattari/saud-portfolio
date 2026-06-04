import { Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const items = [
  ["Home", "/"],
  ["About", "/about"],
  ["Projects", "/projects"],
  ["Services", "/services"],
  ["Contact", "/contact"]
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navClass = ({ isActive }) =>
    `text-sm font-semibold transition ${isActive ? "text-primary" : "text-slate-600 hover:text-ink"}`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 glass">
      <div className="container-custom flex h-20 items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3">
          <div className="mock-icon h-11 w-11 text-primary">
            <Sparkles size={22} />
          </div>
          <div>
            <p className="text-lg font-black leading-none text-ink">Mohammad Saud</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Android Developer</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {items.map(([label, path]) => (
            <NavLink key={path} to={path} className={navClass}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/admin" className="btn-outline text-sm">Admin</Link>
          <Link to="/contact" className="btn-primary text-sm">Hire Me</Link>
        </div>

        <button
          className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-700 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="container-custom flex flex-col gap-4 py-5">
            {items.map(([label, path]) => (
              <NavLink key={path} to={path} onClick={() => setOpen(false)} className={navClass}>
                {label}
              </NavLink>
            ))}
            <div className="flex gap-3 pt-2">
              <Link to="/admin" onClick={() => setOpen(false)} className="btn-outline text-sm">Admin</Link>
              <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary text-sm">Hire Me</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
