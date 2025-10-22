"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5 p-4">
      <Card className="w-full max-w-md p-8">
        <div className="space-y-6 text-center">
          <div className="text-5xl">✓</div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Account Created!</h1>
            <p className="text-muted-foreground mt-2">
              Please check your email to confirm your account before signing in.
            </p>
          </div>

          <Link href="/auth/login">
            <Button className="w-full">Back to Sign In</Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
