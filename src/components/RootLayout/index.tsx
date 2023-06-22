import Footer from './Footer';
import Header from './Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex h-full flex-grow flex-col items-center justify-center">
        {children}
      </main>
      <Footer year={new Date().getFullYear()} />
    </>
  );
}
