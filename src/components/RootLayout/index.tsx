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
      <main className="h-full w-full flex-grow flex flex-col justify-center items-center">{children}</main>
      <Footer year={new Date().getFullYear()} />
    </>
  );
}
