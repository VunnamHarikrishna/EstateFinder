"use client";

import AdminNavbar from '@/components/AdminNavbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Building, 
  CalendarCheck, 
  TrendingUp,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  Cell
} from 'recharts';
import { Button } from '@/components/ui/button';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-muted/20 pl-64">
      <AdminNavbar />
      
      <main className="p-8 space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-headline font-bold">Sales Overview</h1>
            <p className="text-muted-foreground">Real-time performance metrics for Tirupati region.</p>
          </div>
          <div className="bg-white p-2 rounded-xl shadow-sm border flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Last updated: Just now</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Sales', value: '₹4.5 Cr', icon: TrendingUp, trend: '+8.5%', color: 'text-green-600' },
            { label: 'Active Listings', value: '18', icon: Building, trend: '+2 new', color: 'text-primary' },
            { label: 'Site Visits', value: '64', icon: CalendarCheck, trend: '+12%', color: 'text-blue-600' },
            { label: 'Total Leads', value: '450', icon: Users, trend: '+32', color: 'text-purple-600' },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-md overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-muted rounded-lg">
                    <stat.icon className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {stat.trend}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-3xl font-headline font-bold mt-1">{stat.value}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-none shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Revenue Growth (in Lakhs)</CardTitle>
              <Button variant="ghost" size="sm" className="gap-2">
                View Report <ArrowUpRight className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip 
                      cursor={{fill: 'rgba(0,0,0,0.05)'}}
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                    />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === data.length - 1 ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.3)'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Recent Tirupati Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { user: 'Kiran Kumar', action: 'booked Alipiri visit', time: '5 mins ago' },
                  { user: 'Sravani P.', action: 'purchased Plot #12', time: '1 hour ago' },
                  { user: 'Naidu Garu', action: 'requested callback', time: '3 hours ago' },
                  { user: 'Madhav S.', action: 'viewed KT Road Villa', time: '5 hours ago' },
                ].map((act, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="bg-primary/10 w-8 h-8 rounded-full shrink-0 flex items-center justify-center font-bold text-xs text-primary">
                      {act.user.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-bold">{act.user}</span> {act.action}
                      </p>
                      <p className="text-xs text-muted-foreground">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-6">View All Leads</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  const { cn } = require('@/lib/utils');
  return (
    <div className={cn("px-2 py-0.5 rounded-full text-xs font-bold flex items-center", className)}>
      {children}
    </div>
  );
}