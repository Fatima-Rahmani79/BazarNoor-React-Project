export default function Logo() {
  return (
    <div className="flex items-center gap-2 select-none">
      <div className="grid h-9 w-9 place-items-center overflow-hidden rounded-2xl bg-slate-900 text-white shadow-sm">
        <img
          src="../../logo.png"
          alt="Bazaar-e-Noor logo"
          className="h-full w-full object-cover"
          draggable="false"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <span className="text-sm font-black">BN</span>
      </div>

      <div className="leading-tight">
        <div className="text-sm font-extrabold text-slate-900">Bazaar-e-Noor</div>
        <div className="text-xs font-semibold text-slate-500">Digital Afghan Marketplace</div>
      </div>
    </div>
  );
}