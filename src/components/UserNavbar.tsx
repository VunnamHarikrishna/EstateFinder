"use client";

import Link from 'next/link';
import { Home, Search, Heart, User, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function UserNavbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg">
            <Home className="text-white w-6 h-6" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight text-primary">
            Estate<span className="text-secondary">Finder</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Heart className="w-5 h-5" />
          </Button>
          <Link href="/admin/login">
            <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary/10">
              <ShieldCheck className="w-4 h-4" />
              Admin
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
