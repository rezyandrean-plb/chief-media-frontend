import { Skeleton } from "@/components/ui/skeleton"

export default function ProfileSettingsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <div className="bg-[#273F4F] text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-10 w-64 bg-white/20" />
              <Skeleton className="h-6 w-96 bg-white/10" />
            </div>
            <Skeleton className="h-10 w-32 bg-white/20" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <Skeleton className="h-12 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
