export default function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-xs text-nexus-green">
      <span className="h-1.5 w-1.5 rounded-full bg-nexus-green shadow-glow-sm" />
      {children}
    </div>
  );
}
