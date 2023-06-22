export default function SectionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-full min-h-full w-full">
      <div className="container mx-auto h-full w-full max-w-6xl px-4 py-2">
        {children}
      </div>
    </section>
  );
}
