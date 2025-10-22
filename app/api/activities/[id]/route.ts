import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get activity to retrieve tokens
    const { data: activity } = await supabase
      .from("activities")
      .select("tokens_earned")
      .eq("id", params.id)
      .eq("user_id", user.id)
      .single()

    if (!activity) {
      return NextResponse.json({ error: "Activity not found" }, { status: 404 })
    }

    // Delete activity
    const { error } = await supabase.from("activities").delete().eq("id", params.id).eq("user_id", user.id)

    if (error) throw error

    // Refund tokens
    const { data: profile } = await supabase.from("profiles").select("tokens_balance").eq("id", user.id).single()

    if (profile) {
      await supabase
        .from("profiles")
        .update({ tokens_balance: Math.max(0, (profile.tokens_balance || 0) - activity.tokens_earned) })
        .eq("id", user.id)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete activity" }, { status: 500 })
  }
}
