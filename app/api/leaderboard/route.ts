import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const sortBy = searchParams.get("sortBy") || "tokens"

    let query = supabase.from("profiles").select("id, display_name, tokens_balance, current_streak")

    if (sortBy === "tokens") {
      query = query.order("tokens_balance", { ascending: false })
    } else if (sortBy === "streak") {
      query = query.order("current_streak", { ascending: false })
    }

    const { data, error } = await query.limit(10)

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 })
  }
}
