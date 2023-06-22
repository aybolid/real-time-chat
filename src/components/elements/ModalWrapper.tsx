export default function ModalWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="absolute left-0 top-0 grid h-full w-full place-items-center bg-black/60">
      <div className="glass max-w-xl rounded-md bg-white p-4 shadow-lg">
        {children}
      </div>
    </div>
  );
}
