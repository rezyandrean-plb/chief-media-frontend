"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-foreground mb-4">Something went wrong!</h1>
        <p className="text-muted-foreground mb-6">We encountered an error while loading the page. Please try again.</p>
        <div className="space-y-4">
          <Button onClick={reset} className="bg-primary hover:bg-primary/90 text-white px-6 py-2">
            Try again
          </Button>
          <Button variant="outline" onClick={() => (window.location.href = "/")} className="ml-4">
            Go home
          </Button>
        </div>
        {process.env.NODE_ENV === "development" && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-muted-foreground">Error details (development only)</summary>
            <pre className="mt-2 text-xs bg-muted p-4 rounded overflow-auto">
              {error.message}
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}
