import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProjectDetailsLoading() {
  return (
    <div className="min-h-screen font-sans bg-white">
      <div className="bg-[#273F4F] text-white py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Skeleton className="h-8 w-32 mb-4 bg-white/20" />
          <Skeleton className="h-10 w-96 mb-2 bg-white/20" />
          <Skeleton className="h-6 w-64 bg-white/20" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-12 w-12 rounded-full mb-4" />
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-4 w-32" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
