import Aside from './Aside';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Aside />
      <main className="h-full min-h-screen w-full">
        {children}
      </main>
    </>
  );
}
