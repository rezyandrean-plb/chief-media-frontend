import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-6">The page you're looking for doesn't exist or has been moved.</p>
        <div className="space-y-4">
          <Button asChild className="bg-primary hover:bg-primary/90 text-white px-6 py-2">
            <Link href="/">Go Home</Link>
          </Button>
          <Button variant="outline" asChild className="ml-4 bg-transparent">
            <Link href="/vendors">Browse Vendors</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
