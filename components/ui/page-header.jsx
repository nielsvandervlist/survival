"use client";
export function PageHeader({
  title,
  subtitle,
  children
}) {
  return (
    <div className="text-center mb-16">
      <h1
        className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
        {title}
      </h1>
      <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">{subtitle}</p>
      {children}
    </div>
  );
}
