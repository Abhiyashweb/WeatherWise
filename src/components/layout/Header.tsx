import { Wind } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="py-4 px-6 bg-primary shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary-foreground hover:opacity-90 transition-opacity">
          <Wind size={32} />
          <h1 className="text-3xl font-headline font-semibold">WeatherWise</h1>
        </Link>
        {/* Future navigation items can go here */}
      </div>
    </header>
  );
}
