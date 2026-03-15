"use client";

import AdminNavbar from '@/components/AdminNavbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Line, 
  LineChart,
  Area,
  AreaChart,
  CartesianGrid
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

const salesData = [
  { month: 'Jan', revenue: 1500000, target: 1200000 },
  { month: 'Feb', revenue: 1800000, target: 1200000 },
  { month: 'Mar', revenue: 2200000, target: 1500000 },
  { month: 'Apr', revenue: 2100000, target: 1500000 },
  { month: 'May', revenue: 2800000, target: 2000000 },
  { month: 'Jun', revenue: 3500000, target: 2000000 },
];

const trafficData = [
  { day: 'Mon', visits: 1200 },
  { day: 'Tue', visits: 1500 },
  { day: 'Wed', visits: 1100 },
  { day: 'Thu', visits: 1800 },
  { day: 'Fri', visits: 2200 },
  { day: 'Sat', visits: 3500 },
  { day: 'Sun', visits: 2800 },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="min-h-screen bg-muted/20 pl-64">
      <AdminNavbar />
      
      <main className="p-8 space-y-8">
        <header>
          <h1 className="text-3xl font-headline font-bold">Performance Analytics</h1>
          <p className="text-muted-foreground">Deep dive into sales figures and user engagement in Tirupati.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Revenue Growth</span>
                <span className="text-green-600 text-sm font-bold flex items-center gap-1">
                  +24% <ArrowUpRight className="w-4 h-4" />
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v/100000}L`} />
                    <Tooltip formatter={(value: number) => `₹${(value/100000).toFixed(1)} Lakhs`} />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(var(--primary))" 
                      fillOpacity={1} 
                      fill="url(#colorRevenue)" 
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>User Engagement (Visits)</span>
                <span className="text-primary text-sm font-bold flex items-center gap-1">
                  15.2k total <TrendingUp className="w-4 h-4" />
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trafficData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="visits" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Conversion Rate', value: '3.2%', sub: '+0.5% from last month' },
            { label: 'Avg. Property Price', value: '₹85L', sub: 'Flat trend' },
            { label: 'User Retention', value: '78%', sub: '+5% improvement' },
          ].map((item, i) => (
            <Card key={i} className="border-none shadow-sm bg-white">
              <CardContent className="p-6 text-center">
                <p className="text-sm font-medium text-muted-foreground uppercase mb-2">{item.label}</p>
                <h3 className="text-4xl font-headline font-bold text-primary">{item.value}</h3>
                <p className="text-xs text-muted-foreground mt-2">{item.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}