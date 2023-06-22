export default function ModalWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed left-0 top-0 z-50 grid h-full w-full place-items-center bg-black/40">
      {children}
    </div>
  );
}
