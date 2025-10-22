"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Mail, MapPin, Calendar, Award, Zap, Settings, Edit2, Save } from "lucide-react"

interface UserStats {
  totalActivities: number
  totalTokens: number
  currentStreak: number
  averageMood: number
}

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Alex User",
    email: "alex@example.com",
    location: "San Francisco, CA",
    joinDate: "January 2024",
    bio: "Wellness enthusiast on a journey to better health",
  })

  const [tempProfile, setTempProfile] = useState(profile)

  const stats: UserStats = {
    totalActivities: 41,
    totalTokens: 2450,
    currentStreak: 12,
    averageMood: 7.7,
  }

  const achievements = [
    { id: 1, icon: "🏃", title: "First Steps", description: "Complete 5 activities", unlocked: true },
    { id: 2, icon: "🔥", title: "On Fire", description: "7 day streak", unlocked: true },
    { id: 3, icon: "🌟", title: "Star Performer", description: "Earn 1000 tokens", unlocked: false },
    { id: 4, icon: "💪", title: "Consistency King", description: "30 day streak", unlocked: false },
    { id: 5, icon: "🎯", title: "Goal Getter", description: "Complete 50 activities", unlocked: false },
    { id: 6, icon: "🏆", title: "Champion", description: "Reach top 10 leaderboard", unlocked: false },
  ]

  const handleSaveProfile = () => {
    setProfile(tempProfile)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempProfile(profile)
    setIsEditing(false)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">My Profile</h2>
          <p className="text-muted-foreground">Manage your wellbeing journey</p>
        </div>
        <Button
          onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
          className="gap-2"
          variant={isEditing ? "default" : "outline"}
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-1 p-6 text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
            <User className="w-12 h-12 text-primary-foreground" />
          </div>
          {isEditing ? (
            <input
              type="text"
              value={tempProfile.name}
              onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-center font-bold mb-2 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          ) : (
            <h3 className="text-xl font-bold text-foreground mb-1">{profile.name}</h3>
          )}
          <p className="text-sm text-muted-foreground mb-4">Wellness Enthusiast</p>
          {isEditing && (
            <Button size="sm" variant="outline" onClick={handleCancel} className="w-full bg-transparent">
              Cancel
            </Button>
          )}
        </Card>

        <Card className="md:col-span-2 p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Profile Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Email</p>
                {isEditing ? (
                  <input
                    type="email"
                    value={tempProfile.email}
                    onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                    className="w-full px-2 py-1 rounded bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                ) : (
                  <p className="text-foreground">{profile.email}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Location</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempProfile.location}
                    onChange={(e) => setTempProfile({ ...tempProfile, location: e.target.value })}
                    className="w-full px-2 py-1 rounded bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                ) : (
                  <p className="text-foreground">{profile.location}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Member Since</p>
                <p className="text-foreground">{profile.joinDate}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Total Activities</p>
              <p className="text-2xl font-bold text-foreground">{stats.totalActivities}</p>
            </div>
            <Zap className="w-6 h-6 text-primary" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Total Tokens</p>
              <p className="text-2xl font-bold text-foreground">{stats.totalTokens}</p>
            </div>
            <Zap className="w-6 h-6 text-accent" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Current Streak</p>
              <p className="text-2xl font-bold text-foreground">{stats.currentStreak} days</p>
            </div>
            <Award className="w-6 h-6 text-green-500" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Avg Mood</p>
              <p className="text-2xl font-bold text-foreground">{stats.averageMood}/10</p>
            </div>
            <User className="w-6 h-6 text-blue-500" />
          </div>
        </Card>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-accent" />
          Achievements
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <Card
              key={achievement.id}
              className={`p-4 text-center transition-all ${
                achievement.unlocked ? "bg-primary/10 border-primary/20" : "bg-muted/50 border-muted opacity-60"
              }`}
            >
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <p className="font-medium text-foreground text-sm">{achievement.title}</p>
              <p className="text-xs text-muted-foreground">{achievement.description}</p>
              {achievement.unlocked && <p className="text-xs text-primary font-semibold mt-2">✓ Unlocked</p>}
            </Card>
          ))}
        </div>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-foreground">Email Notifications</label>
            <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer" />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-foreground">Weekly Summary</label>
            <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer" />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-foreground">Activity Reminders</label>
            <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer" />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-foreground">Dark Mode</label>
            <input type="checkbox" className="w-4 h-4 cursor-pointer" />
          </div>
        </div>
      </Card>
    </div>
  )
}
