export default function SectionTitle({ label, title, description, align = "center" }) {
  const classes = align === "left" ? "max-w-2xl" : "mx-auto max-w-3xl text-center";

  return (
    <div className={`mb-12 ${classes}`}>
      <span className="inline-flex rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-primary">
        {label}
      </span>
      <h2 className="mt-5 text-balance text-3xl font-black tracking-tight text-ink md:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-5 text-lg leading-8 text-slate-600">{description}</p>}
    </div>
  );
}
