"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, TrendingUp, Calendar } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface MoodEntry {
  date: string
  mood: number
  note: string
}

const moodEmojis = ["😢", "😕", "😐", "🙂", "😊", "😄", "🤩", "🥰", "😍", "🌟"]

const moodTrendData = [
  { day: "Mon", mood: 6 },
  { day: "Tue", mood: 7 },
  { day: "Wed", mood: 5 },
  { day: "Thu", mood: 8 },
  { day: "Fri", mood: 9 },
  { day: "Sat", mood: 8 },
  { day: "Sun", mood: 7 },
]

export default function MoodTracker() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([
    { date: "Today", mood: 8, note: "Feeling great after morning yoga!" },
    { date: "Yesterday", mood: 7, note: "Good day overall" },
    { date: "2 days ago", mood: 6, note: "Bit tired but productive" },
  ])
  const [selectedMood, setSelectedMood] = useState(5)
  const [note, setNote] = useState("")

  const handleSubmit = () => {
    if (selectedMood !== null) {
      setMoodEntries([
        {
          date: "Today",
          mood: selectedMood,
          note: note || "No notes",
        },
        ...moodEntries,
      ])
      setSelectedMood(5)
      setNote("")
    }
  }

  const averageMood =
    moodEntries.length > 0 ? (moodEntries.reduce((sum, e) => sum + e.mood, 0) / moodEntries.length).toFixed(1) : 0

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Mood Tracker</h2>
        <p className="text-muted-foreground">Track your emotional wellbeing throughout the week</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Average Mood</p>
              <p className="text-3xl font-bold text-foreground">{averageMood}/10</p>
            </div>
            <Heart className="w-8 h-8 text-accent" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Entries</p>
              <p className="text-3xl font-bold text-foreground">{moodEntries.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Trend</p>
              <p className="text-3xl font-bold text-green-600">↑ Positive</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </Card>
      </div>

      <Card className="p-8 mb-8 bg-gradient-to-br from-accent/10 to-accent/5">
        <h3 className="text-xl font-semibold text-foreground mb-6">How are you feeling today?</h3>
        <div className="flex justify-between items-center gap-2 mb-8">
          {moodEmojis.map((emoji, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedMood(idx)}
              className={`text-4xl transition-all ${
                selectedMood === idx ? "scale-125" : "scale-100 opacity-60 hover:opacity-100"
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-foreground mb-2">Add a note (optional)</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            rows={3}
          />
        </div>
        <Button onClick={handleSubmit} className="w-full gap-2">
          <Heart className="w-4 h-4" />
          Log Mood
        </Button>
      </Card>

      <Card className="p-6 mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">Mood Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={moodTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" domain={[0, 10]} />
            <Tooltip contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }} />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="var(--color-accent)"
              strokeWidth={3}
              dot={{ fill: "var(--color-accent)", r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Entries</h3>
        {moodEntries.map((entry, idx) => (
          <Card key={idx} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{entry.date}</p>
                <p className="text-sm text-muted-foreground">{entry.note}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl mb-2">{moodEmojis[entry.mood]}</div>
                <p className="text-sm font-semibold text-foreground">{entry.mood}/10</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
