
"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { MessageSquareHeart, Star, Send, CheckCircle2, ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useFirestore, useUser } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function FeedbackPage() {
  const { toast } = useToast();
  const { firestore } = useFirestore();
  const { user } = useUser();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [category, setCategory] = useState("general");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore) return;

    setLoading(true);

    const feedbackData = {
      userId: user?.uid || "anonymous",
      rating: parseInt(rating),
      comment,
      category,
      timestamp: new Date().toISOString(),
      createdAt: serverTimestamp(),
    };

    const feedbackRef = collection(firestore, "feedback");

    addDoc(feedbackRef, feedbackData)
      .then(() => {
        setSubmitted(true);
        toast({
          title: "Feedback Shared",
          description: "Thank you for helping us make SHEROUTE better.",
        });
      })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: "feedback",
          operation: "create",
          requestResourceData: feedbackData,
        });
        errorEmitter.emit("permission-error", permissionError);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center font-body">
        <div className="bg-white p-12 rounded-[2rem] shadow-xl space-y-6 w-full max-w-sm">
          <div className="bg-pink-100 text-primary w-20 h-20 rounded-full flex items-center justify-center mx-auto animate-in zoom-in duration-500">
            <CheckCircle2 size={40} />
          </div>
          <h1 className="text-2xl font-black text-primary uppercase tracking-tight">Thank You!</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Your feedback helps us build a safer community for everyone. We appreciate your voice.
          </p>
          <Link href="/">
            <Button className="w-full rounded-xl h-12 bg-primary mt-4">
              Return Home
            </Button>
          </Link>
        </div>
        <Navigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24 font-body">
      <header className="px-6 py-8 bg-white border-b border-border sticky top-0 z-40">
        <div className="flex items-center gap-4 mb-2">
          <Link href="/" className="text-primary hover:bg-muted p-1 rounded-full transition-colors">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-2xl font-black tracking-tight text-primary flex items-center gap-2">
            <MessageSquareHeart className="w-7 h-7" />
            Feedback Hub
          </h1>
        </div>
        <p className="text-muted-foreground text-sm pl-10">
          Share your experience to help us improve SHEROUTE.
        </p>
      </header>

      <main className="px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="border-none shadow-lg bg-white overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-black uppercase tracking-tight">Your Experience</CardTitle>
              <CardDescription>How was your last journey with us?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Rating</label>
                <div className="flex justify-between gap-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setRating(val.toString())}
                      className={cn(
                        "flex-1 aspect-square rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1",
                        rating === val.toString() 
                          ? "border-primary bg-primary/5 text-primary scale-105 shadow-md" 
                          : "border-muted text-muted-foreground hover:border-primary/50"
                      )}
                    >
                      <Star size={20} fill={rating === val.toString() ? "currentColor" : "none"} />
                      <span className="text-[10px] font-bold">{val}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Category</label>
                <RadioGroup value={category} onValueChange={setCategory} className="grid grid-cols-2 gap-3">
                  {["General", "Safety", "Performance", "UI/UX"].map((cat) => (
                    <div key={cat}>
                      <RadioGroupItem value={cat.toLowerCase()} id={cat} className="peer sr-only" />
                      <Label
                        htmlFor={cat}
                        className="flex items-center justify-center rounded-xl border-2 border-muted bg-white p-3 hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer text-[10px] font-bold uppercase transition-all"
                      >
                        {cat}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Comments</label>
                <Textarea 
                  placeholder="What can we do better? What did you love?" 
                  className="bg-muted/30 border-none rounded-xl min-h-[140px] focus-visible:ring-primary/20"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full h-14 rounded-2xl gap-3 bg-primary text-base font-black shadow-xl" disabled={loading}>
                {loading ? "Sending..." : (
                  <>
                    <Send size={18} /> SEND FEEDBACK
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </form>
      </main>

      <Navigation />
    </div>
  );
}
