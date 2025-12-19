export function TimelineItem({ title, place, date, description }) {
  return (
    <div className="relative pl-8 pb-10">
      {/* Dot */}
      <span className="absolute left-0 top-1 w-3 h-3 rounded-full bg-emerald-500" />

      {/* Line */}
      <span className="absolute left-[5px] top-1  h-full w-px bg-white/20" />

      <h4 className="text-white font-semibold">{title}</h4>
      <p className="text-sm text-white/60">
        {place} {date}
      </p>
      <p className="text-sm text-white/50 mt-2 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
