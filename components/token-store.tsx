"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, ShoppingCart, Star } from "lucide-react"

interface Reward {
  id: string
  name: string
  description: string
  cost: number
  icon: string
  category: "premium" | "badge" | "content" | "coaching"
  popular?: boolean
}

const rewards: Reward[] = [
  {
    id: "1",
    name: "Premium Meditation Pack",
    description: "Access to 50+ guided meditations",
    cost: 500,
    icon: "🧘",
    category: "premium",
    popular: true,
  },
  {
    id: "2",
    name: "Fitness Challenge Badge",
    description: "Exclusive digital badge for your profile",
    cost: 200,
    icon: "🏆",
    category: "badge",
  },
  {
    id: "3",
    name: "Wellness E-book",
    description: "Complete guide to holistic wellbeing",
    cost: 300,
    icon: "📚",
    category: "content",
  },
  {
    id: "4",
    name: "Personalized Coaching Session",
    description: "1-on-1 session with wellness coach",
    cost: 800,
    icon: "👨‍🏫",
    category: "coaching",
    popular: true,
  },
  {
    id: "5",
    name: "Nutrition Guide",
    description: "Personalized nutrition recommendations",
    cost: 350,
    icon: "🥗",
    category: "content",
  },
  {
    id: "6",
    name: "Sleep Optimization Pack",
    description: "Sleep tracking and improvement tools",
    cost: 450,
    icon: "😴",
    category: "premium",
  },
]

export default function TokenStore() {
  const [tokens, setTokens] = useState(2450)
  const [purchased, setPurchased] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handlePurchase = (reward: Reward) => {
    if (tokens >= reward.cost) {
      setTokens(tokens - reward.cost)
      setPurchased([...purchased, reward.id])
    }
  }

  const filteredRewards = selectedCategory ? rewards.filter((r) => r.category === selectedCategory) : rewards
  const popularRewards = rewards.filter((r) => r.popular)

  const categories = [
    { id: "premium", label: "Premium" },
    { id: "badge", label: "Badges" },
    { id: "content", label: "Content" },
    { id: "coaching", label: "Coaching" },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Token Store</h2>
            <p className="text-muted-foreground">Redeem your tokens for exclusive rewards</p>
          </div>
          <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Available Tokens</p>
                <p className="text-2xl font-bold text-foreground">{tokens}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {popularRewards.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-accent" />
            Popular Rewards
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {popularRewards.map((reward) => (
              <Card
                key={reward.id}
                className={`p-6 border-2 transition-all ${
                  purchased.includes(reward.id)
                    ? "bg-green-500/10 border-green-500/30"
                    : "border-accent/30 hover:border-accent/50"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">{reward.icon}</div>
                  <Star className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{reward.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{reward.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-primary font-semibold">
                    <Zap className="w-4 h-4" />
                    {reward.cost}
                  </div>
                  <Button
                    size="sm"
                    variant={purchased.includes(reward.id) ? "secondary" : "default"}
                    onClick={() => handlePurchase(reward)}
                    disabled={tokens < reward.cost || purchased.includes(reward.id)}
                    className="gap-1"
                  >
                    {purchased.includes(reward.id) ? (
                      <>✓ Owned</>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        Buy
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">Browse All Rewards</h3>
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
            size="sm"
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat.id)}
              size="sm"
            >
              {cat.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRewards.map((reward) => (
            <Card
              key={reward.id}
              className={`p-6 flex flex-col transition-all ${
                purchased.includes(reward.id) ? "bg-green-500/10 border-green-500/20" : "hover:border-primary/50"
              }`}
            >
              <div className="text-4xl mb-3">{reward.icon}</div>
              <h3 className="font-semibold text-foreground mb-2">{reward.name}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">{reward.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-primary font-semibold">
                  <Zap className="w-4 h-4" />
                  {reward.cost}
                </div>
                <Button
                  size="sm"
                  variant={purchased.includes(reward.id) ? "secondary" : "default"}
                  onClick={() => handlePurchase(reward)}
                  disabled={tokens < reward.cost || purchased.includes(reward.id)}
                  className="gap-1"
                >
                  {purchased.includes(reward.id) ? (
                    <>✓ Owned</>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      Buy
                    </>
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
