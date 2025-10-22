"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, TrendingUp, AlertCircle, Lightbulb, RefreshCw } from "lucide-react"

interface Insight {
  type: "positive" | "insight" | "suggestion"
  icon: React.ReactNode
  title: string
  description: string
  actionable?: boolean
}

const generateInsights = (): Insight[] => [
  {
    type: "positive",
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Great Progress!",
    description: "Your activity streak has reached 12 days. Keep up the momentum!",
  },
  {
    type: "insight",
    icon: <Lightbulb className="w-5 h-5" />,
    title: "Pattern Detected",
    description: "Your mood improves by 2 points on days when you exercise. Consider adding more physical activity.",
    actionable: true,
  },
  {
    type: "suggestion",
    icon: <AlertCircle className="w-5 h-5" />,
    title: "Recommendation",
    description: "You haven't logged any meditation this week. Try starting with just 5 minutes daily.",
    actionable: true,
  },
]

export default function AIInsights() {
  const [insights, setInsights] = useState<Insight[]>(generateInsights())
  const [isLoading, setIsLoading] = useState(false)

  const handleRefreshInsights = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setInsights(generateInsights())
    setIsLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-accent" />
            AI Insights
          </h2>
          <p className="text-muted-foreground">Personalized recommendations based on your wellbeing data</p>
        </div>
        <Button onClick={handleRefreshInsights} disabled={isLoading} className="gap-2">
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          {isLoading ? "Analyzing..." : "Refresh"}
        </Button>
      </div>

      <div className="space-y-4 mb-8">
        {insights.map((insight, idx) => (
          <Card
            key={idx}
            className={`p-6 border-l-4 transition-all ${
              insight.type === "positive"
                ? "border-l-green-500 bg-green-500/5"
                : insight.type === "insight"
                  ? "border-l-blue-500 bg-blue-500/5"
                  : "border-l-amber-500 bg-amber-500/5"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-3 rounded-lg flex-shrink-0 ${
                  insight.type === "positive"
                    ? "bg-green-500/20 text-green-600"
                    : insight.type === "insight"
                      ? "bg-blue-500/20 text-blue-600"
                      : "bg-amber-500/20 text-amber-600"
                }`}
              >
                {insight.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{insight.title}</h3>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
                {insight.actionable && (
                  <Button size="sm" variant="ghost" className="mt-3 gap-1 text-accent hover:text-accent/80">
                    Learn More →
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
        <h3 className="font-semibold text-foreground mb-3">Weekly Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Activities</p>
            <p className="text-2xl font-bold text-primary">41</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Avg Mood</p>
            <p className="text-2xl font-bold text-primary">7.7/10</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Top Category</p>
            <p className="text-2xl font-bold text-primary">Exercise</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Tokens</p>
            <p className="text-2xl font-bold text-primary">2,450</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
