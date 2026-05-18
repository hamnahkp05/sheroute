"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Map, MessageSquare, User, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/routes", label: "Routes", icon: Map },
  { href: "/havens", label: "Havens", icon: Shield },
  { href: "/reports", label: "Reports", icon: MessageSquare },
  { href: "/vault", label: "Vault", icon: User },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50 px-2 py-3 md:py-4 flex justify-around items-center">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors duration-200 group px-2",
              isActive ? "text-primary" : "text-muted-foreground"
            )}
          >
            <div className={cn(
              "p-1.5 rounded-xl transition-all duration-200",
              isActive ? "bg-primary/10" : "group-hover:bg-muted"
            )}>
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-medium uppercase tracking-wider">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}