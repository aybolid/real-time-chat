interface FooterProps {
  year: number;
}

export default function Footer({ year }: FooterProps) {
  return (
    <footer className="flex w-full items-center justify-center">
      <div className="container flex max-w-7xl items-center justify-center px-8 py-2">
        <small>©{year} - RTC</small>
      </div>
    </footer>
  );
}
