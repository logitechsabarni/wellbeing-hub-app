"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, TrendingUp, Users } from "lucide-react"

interface LeaderboardEntry {
  rank: number
  name: string
  tokens: number
  activities: number
  streak: number
  avatar: string
  isUser?: boolean
}

const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, name: "Alex Chen", tokens: 5200, activities: 87, streak: 25, avatar: "👨‍💼" },
  { rank: 2, name: "Sarah Johnson", tokens: 4800, activities: 82, streak: 22, avatar: "👩‍💻" },
  { rank: 3, name: "You", tokens: 2450, activities: 41, streak: 12, avatar: "👤", isUser: true },
  { rank: 4, name: "Mike Wilson", tokens: 2100, activities: 38, streak: 10, avatar: "👨‍🎨" },
  { rank: 5, name: "Emma Davis", tokens: 1950, activities: 35, streak: 9, avatar: "👩‍🔬" },
  { rank: 6, name: "James Brown", tokens: 1800, activities: 32, streak: 8, avatar: "👨‍⚕️" },
  { rank: 7, name: "Lisa Wang", tokens: 1650, activities: 29, streak: 7, avatar: "👩‍🎓" },
]

type LeaderboardType = "tokens" | "activities" | "streak"

export default function Leaderboard() {
  const [leaderboardType, setLeaderboardType] = useState<LeaderboardType>("tokens")
  const [following, setFollowing] = useState<string[]>([])

  const sortedData = [...leaderboardData].sort((a, b) => {
    switch (leaderboardType) {
      case "activities":
        return b.activities - a.activities
      case "streak":
        return b.streak - a.streak
      case "tokens":
      default:
        return b.tokens - a.tokens
    }
  })

  const toggleFollow = (name: string) => {
    setFollowing((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]))
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Trophy className="w-8 h-8 text-accent" />
          Leaderboard
        </h2>
        <p className="text-muted-foreground">See how you compare with other wellbeing enthusiasts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-4 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Top Performer</p>
              <p className="text-lg font-bold text-foreground">{leaderboardData[0].name}</p>
            </div>
            <Medal className="w-6 h-6 text-yellow-500" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Your Rank</p>
              <p className="text-lg font-bold text-foreground">#3 of {leaderboardData.length}</p>
            </div>
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Active Users</p>
              <p className="text-lg font-bold text-foreground">{leaderboardData.length}</p>
            </div>
            <Users className="w-6 h-6 text-accent" />
          </div>
        </Card>
      </div>

      <Card className="p-6 mb-8">
        <div className="flex gap-2 mb-6">
          <Button
            variant={leaderboardType === "tokens" ? "default" : "outline"}
            onClick={() => setLeaderboardType("tokens")}
            size="sm"
          >
            By Tokens
          </Button>
          <Button
            variant={leaderboardType === "activities" ? "default" : "outline"}
            onClick={() => setLeaderboardType("activities")}
            size="sm"
          >
            By Activities
          </Button>
          <Button
            variant={leaderboardType === "streak" ? "default" : "outline"}
            onClick={() => setLeaderboardType("streak")}
            size="sm"
          >
            By Streak
          </Button>
        </div>

        <div className="space-y-3">
          {sortedData.map((entry, idx) => (
            <div
              key={entry.rank}
              className={`p-4 flex items-center justify-between rounded-lg border transition-all ${
                entry.isUser ? "bg-primary/10 border-primary/30" : "bg-card border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center justify-center w-10 h-10">
                  {idx < 3 ? (
                    <Medal
                      className={`w-6 h-6 ${
                        idx === 0 ? "text-yellow-500" : idx === 1 ? "text-gray-400" : "text-orange-600"
                      }`}
                    />
                  ) : (
                    <span className="font-bold text-muted-foreground">{idx + 1}</span>
                  )}
                </div>
                <div className="text-2xl">{entry.avatar}</div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{entry.name}</p>
                  <p className="text-xs text-muted-foreground">{entry.streak} day streak</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-right mr-4">
                <div>
                  <p className="text-xs text-muted-foreground">Activities</p>
                  <p className="font-semibold text-foreground">{entry.activities}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tokens</p>
                  <p className="font-semibold text-primary">{entry.tokens}</p>
                </div>
              </div>
              {!entry.isUser && (
                <Button
                  size="sm"
                  variant={following.includes(entry.name) ? "default" : "outline"}
                  onClick={() => toggleFollow(entry.name)}
                >
                  {following.includes(entry.name) ? "Following" : "Follow"}
                </Button>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
