"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Dashboard from "@/components/dashboard"
import ActivityTracker from "@/components/activity-tracker"
import MoodTracker from "@/components/mood-tracker"
import AIInsights from "@/components/ai-insights"
import TokenStore from "@/components/token-store"
import Leaderboard from "@/components/leaderboard"
import UserProfile from "@/components/user-profile"

type Page = "dashboard" | "activities" | "mood" | "insights" | "store" | "leaderboard" | "profile"

export default function Home() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard")

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />
      case "activities":
        return <ActivityTracker />
      case "mood":
        return <MoodTracker />
      case "insights":
        return <AIInsights />
      case "store":
        return <TokenStore />
      case "leaderboard":
        return <Leaderboard />
      case "profile":
        return <UserProfile />
      default:
        return <Dashboard />
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="pt-20">{renderPage()}</div>
    </main>
  )
}
