export default function SectionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid h-full w-full flex-grow grid-cols-1 grid-rows-1">
      <div className="container mx-auto h-full w-full max-w-6xl flex-grow px-4 py-2">
        {children}
      </div>
    </section>
  );
}
