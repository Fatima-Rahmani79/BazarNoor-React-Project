export default function EmptyState({ title, subtitle }) {
  return (
    <div className="card grid place-items-center p-10 text-center">
      <div className="text-lg font-extrabold text-slate-900">{title}</div>
      <div className="mt-2 max-w-md text-sm font-medium text-slate-600">{subtitle}</div>
    </div>
  );
}
