interface FooterProps {
  year: number;
}

export default function Footer({ year }: FooterProps) {
  return (
    <footer className="flex w-full items-center justify-center">
      <div className="container flex max-w-7xl items-center justify-center text-white py-2 px-8">
        <small>©{year} - Real Time Chat</small>
      </div>
    </footer>
  );
}
