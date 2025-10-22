"use client"

import type React from "react"

import { Activity, BarChart3, Heart, Sparkles, Store, Trophy, User } from "lucide-react"
import { Button } from "@/components/ui/button"

type Page = "dashboard" | "activities" | "mood" | "insights" | "store" | "leaderboard" | "profile"

interface NavigationProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const navItems: { label: string; page: Page; icon: React.ReactNode }[] = [
    { label: "Dashboard", page: "dashboard", icon: <BarChart3 className="w-5 h-5" /> },
    { label: "Activities", page: "activities", icon: <Activity className="w-5 h-5" /> },
    { label: "Mood", page: "mood", icon: <Heart className="w-5 h-5" /> },
    { label: "Insights", page: "insights", icon: <Sparkles className="w-5 h-5" /> },
    { label: "Store", page: "store", icon: <Store className="w-5 h-5" /> },
    { label: "Leaderboard", page: "leaderboard", icon: <Trophy className="w-5 h-5" /> },
    { label: "Profile", page: "profile", icon: <User className="w-5 h-5" /> },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Wellbeing Hub</h1>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.page}
                variant={currentPage === item.page ? "default" : "ghost"}
                size="sm"
                onClick={() => onNavigate(item.page)}
                className="gap-2"
              >
                {item.icon}
                <span className="hidden lg:inline">{item.label}</span>
              </Button>
            ))}
          </div>

          <div className="md:hidden flex gap-2">
            {navItems.slice(0, 3).map((item) => (
              <Button
                key={item.page}
                variant={currentPage === item.page ? "default" : "ghost"}
                size="icon"
                onClick={() => onNavigate(item.page)}
              >
                {item.icon}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
