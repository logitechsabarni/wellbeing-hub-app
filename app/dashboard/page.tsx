"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import Navigation from "@/components/navigation"
import Dashboard from "@/components/dashboard"
import ActivityTracker from "@/components/activity-tracker"
import MoodTracker from "@/components/mood-tracker"
import AIInsights from "@/components/ai-insights"
import TokenStore from "@/components/token-store"
import Leaderboard from "@/components/leaderboard"
import UserProfile from "@/components/user-profile"
import { Button } from "@/components/ui/button"

type Page = "dashboard" | "activities" | "mood" | "insights" | "store" | "leaderboard" | "profile"

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard")
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/auth/login")
      }
      setLoading(false)
    }

    checkAuth()
  }, [router, supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

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
      <div className="pt-20 pb-8">{renderPage()}</div>
      <div className="fixed bottom-4 right-4">
        <Button onClick={handleLogout} variant="outline" size="sm">
          Logout
        </Button>
      </div>
    </main>
  )
}
