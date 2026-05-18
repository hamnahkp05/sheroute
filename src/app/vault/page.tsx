"use client";

import { Navigation } from "@/components/Navigation";
import { User, Shield, Lock, Bell, Plus, Trash2, Smartphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import { useUser, useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

export default function VaultPage() {
  const userImg = PlaceHolderImages.find(img => img.id === "user-avatar");
  const { user } = useUser();
  const { firestore } = useFirestore();

  const userProfileRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: profile } = useDoc(userProfileRef);

  const defaultContacts = [
    { name: "Mom", relation: "Family", phone: "+1 555-0101", initial: "M" },
    { name: "John Wilson", relation: "Partner", phone: "+1 555-0202", initial: "J" },
    { name: "Sarah", relation: "Friend", phone: "+1 555-0303", initial: "S" },
  ];

  const contacts = profile?.guardianCircle || defaultContacts;

  const handleTogglePreference = (key: string, value: boolean) => {
    if (!userProfileRef) return;
    updateDoc(userProfileRef, { [key]: value })
      .catch(async () => {
        const error = new FirestorePermissionError({
          path: userProfileRef.path,
          operation: 'update',
          requestResourceData: { [key]: value },
        });
        errorEmitter.emit('permission-error', error);
      });
  };

  return (
    <div className="min-h-screen bg-background pb-24 px-6 py-8 font-body">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black tracking-tight text-primary flex items-center gap-2">
          <Lock className="w-7 h-7" />
          Identity Vault
        </h1>
        <Badge className="bg-secondary/10 text-secondary border-none hover:bg-secondary/20">Encrypted</Badge>
      </header>

      <main className="space-y-6">
        {/* User Profile Summary */}
        <section>
          <Card className="border-none shadow-lg bg-white overflow-hidden">
            <CardContent className="p-6 flex items-center gap-6">
              <Avatar className="w-20 h-20 border-4 border-primary/10">
                <AvatarImage src={user?.photoURL || userImg?.imageUrl} />
                <AvatarFallback>{user?.displayName?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h2 className="text-xl font-black text-primary">{user?.displayName || "Anonymous Hero"}</h2>
                <p className="text-sm text-muted-foreground">Safety Score: <span className="text-primary font-bold">{profile?.safetyScore || "Bronze"}</span></p>
                <Badge variant="outline" className="text-[10px] font-bold">MEMBER SINCE {profile?.memberSince || '2025'}</Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Emergency Contacts */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black tracking-tight">Guardian Circle</h2>
            <Button size="sm" className="rounded-full bg-primary h-8 px-4 gap-1">
              <Plus size={14} /> Add New
            </Button>
          </div>
          <div className="space-y-3">
            {contacts.map((contact: any, idx: number) => (
              <Card key={idx} className="border-none shadow-md bg-white">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-muted w-10 h-10 rounded-full flex items-center justify-center font-black text-primary">
                      {contact.name?.charAt(0) || "?"}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">{contact.name}</h3>
                      <p className="text-[10px] text-muted-foreground uppercase font-black">{contact.relation} • {contact.phone}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                    <Trash2 size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Risk Preferences */}
        <section className="space-y-4">
          <h2 className="text-lg font-black tracking-tight">Security Protocols</h2>
          <Card className="border-none shadow-lg bg-white">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-primary" />
                    <p className="font-bold text-sm">Real-Time GPS Sync</p>
                  </div>
                  <p className="text-xs text-muted-foreground">Broadcast location during active journeys.</p>
                </div>
                <Switch 
                  checked={profile?.gpsSync ?? true} 
                  onCheckedChange={(checked) => handleTogglePreference('gpsSync', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-primary" />
                    <p className="font-bold text-sm">Safety Check-ins</p>
                  </div>
                  <p className="text-xs text-muted-foreground">Prompt me if I deviate from a safe route.</p>
                </div>
                <Switch 
                  checked={profile?.safetyCheckins ?? true} 
                  onCheckedChange={(checked) => handleTogglePreference('safetyCheckins', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    <p className="font-bold text-sm">Automated SOS</p>
                  </div>
                  <p className="text-xs text-muted-foreground">Trigger if phone experiences high G-force impact.</p>
                </div>
                <Switch 
                  checked={profile?.automatedSos ?? false} 
                  onCheckedChange={(checked) => handleTogglePreference('automatedSos', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Navigation />
    </div>
  );
}
