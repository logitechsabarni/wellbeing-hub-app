"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Clock, Zap, ExternalLink, Trash2, Edit2 } from "lucide-react"

interface Activity {
  id: string
  name: string
  category: string
  duration: number
  tokens: number
  completed: boolean
  resources: string[]
}

const defaultActivities: Activity[] = [
  {
    id: "1",
    name: "Morning Yoga",
    category: "Exercise",
    duration: 30,
    tokens: 50,
    completed: true,
    resources: ["https://www.youtube.com/results?search_query=morning+yoga"],
  },
  {
    id: "2",
    name: "Meditation",
    category: "Mindfulness",
    duration: 15,
    tokens: 30,
    completed: false,
    resources: ["https://www.headspace.com", "https://www.calm.com"],
  },
  {
    id: "3",
    name: "Reading",
    category: "Learning",
    duration: 45,
    tokens: 40,
    completed: true,
    resources: ["https://www.goodreads.com"],
  },
]

export default function ActivityTracker() {
  const [trackedActivities, setTrackedActivities] = useState(defaultActivities)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    category: "Exercise",
    duration: 30,
    tokens: 50,
  })

  const toggleActivity = (id: string) => {
    setTrackedActivities(
      trackedActivities.map((activity) =>
        activity.id === id ? { ...activity, completed: !activity.completed } : activity,
      ),
    )
  }

  const handleSubmit = () => {
    if (!formData.name.trim()) return

    if (editingId) {
      setTrackedActivities(
        trackedActivities.map((activity) => (activity.id === editingId ? { ...activity, ...formData } : activity)),
      )
      setEditingId(null)
    } else {
      const newActivity: Activity = {
        id: Date.now().toString(),
        ...formData,
        completed: false,
        resources: [],
      }
      setTrackedActivities([newActivity, ...trackedActivities])
    }

    setFormData({ name: "", category: "Exercise", duration: 30, tokens: 50 })
    setShowForm(false)
  }

  const handleDelete = (id: string) => {
    setTrackedActivities(trackedActivities.filter((activity) => activity.id !== id))
  }

  const handleEdit = (activity: Activity) => {
    setFormData({
      name: activity.name,
      category: activity.category,
      duration: activity.duration,
      tokens: activity.tokens,
    })
    setEditingId(activity.id)
    setShowForm(true)
  }

  const totalTokens = trackedActivities.filter((a) => a.completed).reduce((sum, a) => sum + a.tokens, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Activity Tracker</h2>
          <p className="text-muted-foreground">Log your wellbeing activities and earn tokens</p>
        </div>
        <div className="flex items-center gap-4">
          <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Tokens Earned Today</p>
              <p className="text-2xl font-bold text-primary">{totalTokens}</p>
            </div>
          </Card>
          <Button
            onClick={() => {
              setShowForm(!showForm)
              setEditingId(null)
              setFormData({ name: "", category: "Exercise", duration: 30, tokens: 50 })
            }}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Activity
          </Button>
        </div>
      </div>

      {showForm && (
        <Card className="p-6 mb-8 bg-gradient-to-br from-accent/10 to-accent/5">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {editingId ? "Edit Activity" : "Add New Activity"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Activity Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Morning Yoga"
                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option>Exercise</option>
                <option>Mindfulness</option>
                <option>Learning</option>
                <option>Social</option>
                <option>Nutrition</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Duration (minutes)</label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: Number.parseInt(e.target.value) })}
                min="1"
                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Tokens Reward</label>
              <input
                type="number"
                value={formData.tokens}
                onChange={(e) => setFormData({ ...formData, tokens: Number.parseInt(e.target.value) })}
                min="1"
                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSubmit} className="flex-1">
              {editingId ? "Update Activity" : "Add Activity"}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowForm(false)
                setEditingId(null)
                setFormData({ name: "", category: "Exercise", duration: 30, tokens: 50 })
              }}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </Card>
      )}

      <div className="grid gap-4">
        {trackedActivities.map((activity) => (
          <Card
            key={activity.id}
            className={`p-6 cursor-pointer transition-all ${
              activity.completed ? "bg-green-500/5 border-green-500/20" : "hover:border-primary/50"
            }`}
            onClick={() => toggleActivity(activity.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      activity.completed ? "bg-green-500 border-green-500" : "border-muted-foreground"
                    }`}
                  >
                    {activity.completed && <span className="text-white text-sm">✓</span>}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{activity.name}</h3>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {activity.category}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {activity.duration} min
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4" />+{activity.tokens} tokens
                  </div>
                </div>
                {activity.resources.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {activity.resources.map((resource, idx) => (
                      <a
                        key={idx}
                        href={resource}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-accent hover:text-accent/80 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Resource <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2 ml-4" onClick={(e) => e.stopPropagation()}>
                <Button size="sm" variant="ghost" onClick={() => handleEdit(activity)} className="gap-1">
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(activity.id)}
                  className="gap-1 text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
