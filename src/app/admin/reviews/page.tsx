"use client";

import { useState } from 'react';
import AdminNavbar from '@/components/AdminNavbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, MessageSquare, Sparkles, User, ThumbsUp, ThumbsDown } from 'lucide-react';
import { summarizeUserReviews } from '@/ai/flows/summarize-user-reviews';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const MOCK_REVIEWS = [
  "The site visit was very well organized. The transportation arrived on time!",
  "Heritage Villa is exactly as shown in pictures. Great experience.",
  "Pricing for the suburban plots is a bit high compared to market rates.",
  "The consultant Pavan was very professional and explained everything well.",
  "Booking process was smooth but took 2 days for confirmation.",
  "Very happy with the transparency in documentation."
];

export default function AdminReviewsPage() {
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState<{keyThemes: string, sentiment: string} | null>(null);
  const { toast } = useToast();

  const handleSummarize = async () => {
    setIsSummarizing(true);
    try {
      const result = await summarizeUserReviews({ reviews: MOCK_REVIEWS });
      setSummary({ keyThemes: result.keyThemes, sentiment: result.overallSentiment });
      toast({ title: "Analysis Complete", description: "AI has summarized recent user feedback." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to summarize reviews.", variant: "destructive" });
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/20 pl-64">
      <AdminNavbar />
      
      <main className="p-8 space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-headline font-bold">User Reviews</h1>
            <p className="text-muted-foreground">Monitor and analyze customer satisfaction.</p>
          </div>
          <Button 
            className="gap-2 bg-secondary hover:bg-secondary/90 shadow-lg"
            onClick={handleSummarize}
            disabled={isSummarizing}
          >
            <Sparkles className="w-4 h-4" />
            {isSummarizing ? "Analyzing Feedback..." : "AI Review Summary"}
          </Button>
        </header>

        {summary && (
          <Card className="border-none shadow-xl bg-gradient-to-br from-secondary/5 to-primary/5 border-l-4 border-secondary">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-secondary" />
                AI-Powered Sentiment Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-bold uppercase text-muted-foreground mb-1">Key Themes Identified</h4>
                  <p className="text-foreground leading-relaxed">
                    {summary.keyThemes}
                  </p>
                </div>
                <div className="flex flex-col justify-center bg-white p-4 rounded-xl border">
                  <h4 className="text-sm font-bold uppercase text-muted-foreground mb-2">Overall Sentiment</h4>
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center",
                      summary.sentiment === 'Positive' ? "bg-green-100 text-green-600" :
                      summary.sentiment === 'Negative' ? "bg-red-100 text-red-600" :
                      "bg-amber-100 text-amber-600"
                    )}>
                      {summary.sentiment === 'Positive' ? <ThumbsUp className="w-6 h-6" /> : <ThumbsDown className="w-6 h-6" />}
                    </div>
                    <div>
                      <span className="text-2xl font-bold">{summary.sentiment}</span>
                      <p className="text-sm text-muted-foreground">Based on {MOCK_REVIEWS.length} recent reviews</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_REVIEWS.map((review, i) => (
            <Card key={i} className="border-none shadow-md">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-muted p-1 rounded-full"><User className="w-4 h-4 text-muted-foreground" /></div>
                    <span className="text-xs font-bold text-muted-foreground">Verified User</span>
                  </div>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                  </div>
                </div>
                <p className="italic text-muted-foreground font-medium">"{review}"</p>
                <div className="pt-4 border-t flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground uppercase">2 days ago</span>
                  <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 uppercase font-bold">Respond</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}