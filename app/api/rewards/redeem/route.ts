import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

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
    const { reward_id } = body

    // Get reward details
    const { data: reward } = await supabase.from("rewards").select("tokens_cost").eq("id", reward_id).single()

    if (!reward) {
      return NextResponse.json({ error: "Reward not found" }, { status: 404 })
    }

    // Get user profile
    const { data: profile } = await supabase.from("profiles").select("tokens_balance").eq("id", user.id).single()

    if (!profile || profile.tokens_balance < reward.tokens_cost) {
      return NextResponse.json({ error: "Insufficient tokens" }, { status: 400 })
    }

    // Create redeemed reward
    const { error: redeemError } = await supabase.from("redeemed_rewards").insert([
      {
        user_id: user.id,
        reward_id,
      },
    ])

    if (redeemError) throw redeemError

    // Update user tokens
    await supabase
      .from("profiles")
      .update({ tokens_balance: profile.tokens_balance - reward.tokens_cost })
      .eq("id", user.id)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to redeem reward" }, { status: 500 })
  }
}
