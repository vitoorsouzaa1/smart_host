import Link from 'next/link';
import { Button } from './ui/button';

export function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-6 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">SmartHost</Link>
        
        <div className="flex items-center gap-6">
          <Link href="/properties" className="text-gray-600 hover:text-blue-600 transition-colors">
            Properties
          </Link>
          <Link href="/bookings" className="text-gray-600 hover:text-blue-600 transition-colors">
            My Bookings
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}