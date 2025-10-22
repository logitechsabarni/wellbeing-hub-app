import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { title, category, duration_minutes, tokens_earned, notes } = body

    const { data, error } = await supabase
      .from("activities")
      .insert([
        {
          user_id: user.id,
          title,
          category,
          duration_minutes,
          tokens_earned,
          notes,
        },
      ])
      .select()

    if (error) throw error

    // Update user tokens
    const { data: profile } = await supabase.from("profiles").select("tokens_balance").eq("id", user.id).single()

    if (profile) {
      await supabase
        .from("profiles")
        .update({ tokens_balance: (profile.tokens_balance || 0) + tokens_earned })
        .eq("id", user.id)
    }

    return NextResponse.json(data[0])
  } catch (error) {
    return NextResponse.json({ error: "Failed to create activity" }, { status: 500 })
  }
}
