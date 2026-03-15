"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Home, ShieldCheck, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@pavan.com' && password === 'admin') {
      router.push('/admin/dashboard');
      toast({ title: "Welcome back, Admin", description: "Login successful." });
    } else {
      toast({ 
        title: "Login Failed", 
        description: "Invalid credentials. Try admin@pavan.com / admin",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="bg-primary w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <ShieldCheck className="text-white w-10 h-10" />
          </div>
          <h1 className="text-3xl font-headline font-bold text-primary">EstateFinder Admin</h1>
          <p className="text-muted-foreground mt-2">Enter your credentials to manage the portal</p>
        </div>

        <Card className="border-none shadow-xl">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Only authorized personnel can access the dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    required 
                    placeholder="admin@pavan.com" 
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button variant="link" className="px-0 h-auto text-xs text-primary">Forgot password?</Button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type="password" 
                    required 
                    placeholder="••••••••" 
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12 font-bold text-lg">
                Login to Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>

        <Button 
          variant="ghost" 
          className="w-full gap-2 text-muted-foreground"
          onClick={() => router.push('/')}
        >
          <Home className="w-4 h-4" />
          Back to Public View
        </Button>
      </div>
    </div>
  );
}