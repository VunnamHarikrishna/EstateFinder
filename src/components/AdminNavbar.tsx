"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Building, 
  BookOpen, 
  BarChart3, 
  MessageSquare, 
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
  { label: 'Properties', icon: Building, href: '/admin/properties' },
  { label: 'Bookings', icon: BookOpen, href: '/admin/bookings' },
  { label: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
  { label: 'Reviews', icon: MessageSquare, href: '/admin/reviews' },
];

export default function AdminNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 bg-white border-r flex flex-col z-50">
      <div className="p-6 border-b flex items-center gap-3">
        <div className="bg-primary p-1.5 rounded-lg">
          <ShieldCheck className="text-white w-6 h-6" />
        </div>
        <span className="font-headline font-bold text-xl tracking-tight text-primary">Admin<span className="text-secondary">Portal</span></span>
      </div>

      <div className="flex-grow p-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 h-12 font-medium transition-all",
                pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
              )}
            >
              <item.icon className={cn("w-5 h-5", pathname === item.href ? "text-primary" : "text-muted-foreground")} />
              {item.label}
            </Button>
          </Link>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="p-4 bg-muted/50 rounded-xl mb-4">
          <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Signed in as</p>
          <p className="text-sm font-bold">Administrator</p>
        </div>
        <Link href="/">
          <Button variant="outline" className="w-full gap-2 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 border-none bg-transparent">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </Link>
      </div>
    </nav>
  );
}