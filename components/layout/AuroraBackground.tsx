export default function AuroraBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative min-h-screen overflow-hidden text-[#E7EBF1]"
      style={{
        backgroundColor: "#010205",
        backgroundImage: [
          "radial-gradient(60% 60% at 0% 0%, #1F1B57 0%, transparent 60%)",
          "radial-gradient(60% 60% at 100% 0%, #0B2942 0%, transparent 60%)",
          "radial-gradient(70% 60% at 50% 100%, #0A2E3B 0%, transparent 60%)",
        ].join(", "),
      }}
    >
      {/* Blobs flutuantes */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#1F1B57] opacity-30 blur-3xl" />
      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-[#0B2942] opacity-30 blur-3xl" />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
