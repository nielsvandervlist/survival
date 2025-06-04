"use client";
export function EmptyState({
  icon: Icon,
  title,
  description
}) {
  return (
    <div className="text-center py-16">
      <Icon className="h-16 w-16 text-slate-400 mx-auto mb-6" />
      <h3 className="text-xl font-semibold text-slate-700 mb-2">{title}</h3>
      <p className="text-slate-500">{description}</p>
    </div>
  );
}
