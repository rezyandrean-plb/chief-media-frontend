"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, List, Building2, CheckCircle, Clock, DollarSign } from "lucide-react"

import AdminLayout from "@/components/AdminLayout"
import { MetricCard } from "@/components/dashboard/metric-card"
import { CalendarView } from "@/components/studio-bookings/calendar-view"
import { BookingListView } from "@/components/studio-bookings/booking-list-view"
import { BookingDetailModal } from "@/components/studio-bookings/booking-detail-modal"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { sampleBookings, sampleStudios } from "@/lib/sample-studios-data"
import type { Booking } from "@/types/studio"

/*
API Endpoints:
- GET /api/admin/bookings - Get all bookings with filters
- GET /api/admin/bookings/:id - Get booking details
- POST /api/admin/bookings/:id/confirm - Confirm a booking
- POST /api/admin/bookings/:id/cancel - Cancel a booking
- POST /api/admin/bookings/:id/refund - Process refund for cancelled booking
- GET /api/admin/studios - Get all studios
- GET /api/admin/studios/:id - Get studio details
*/

export default function StudioBookingsPage() {
  const [bookings, setBookings] = useState(sampleBookings)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const { toast } = useToast()

  const handleBookingClick = (booking: Booking) => {
    console.log("[v0] Opening booking detail modal for:", booking.id)
    setSelectedBooking(booking)
    setIsDetailModalOpen(true)
  }

  const handleConfirm = (bookingId: string) => {
    console.log("[v0] Confirming booking:", bookingId)
    setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status: "confirmed" as const } : b)))
    setIsDetailModalOpen(false)
    toast({
      title: "Booking Confirmed",
      description: "The booking has been confirmed successfully.",
    })
  }

  const handleCancel = (bookingId: string) => {
    console.log("[v0] Cancelling booking:", bookingId)
    setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status: "cancelled" as const } : b)))
    setIsDetailModalOpen(false)
    toast({
      title: "Booking Cancelled",
      description: "The booking has been cancelled.",
      variant: "destructive",
    })
  }

  const handleRefund = (bookingId: string) => {
    console.log("[v0] Processing refund for booking:", bookingId)
    setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, paymentStatus: "refunded" as const } : b)))
    setIsDetailModalOpen(false)
    toast({
      title: "Refund Processed",
      description: "The refund has been processed successfully.",
    })
  }

  const selectedStudio = selectedBooking ? sampleStudios.find((s) => s.id === selectedBooking.studioId) || null : null

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    pending: bookings.filter((b) => b.status === "pending").length,
    revenue: bookings.filter((b) => b.paymentStatus === "paid").reduce((sum, b) => sum + b.totalAmount, 0),
  }

  return (
    <AdminLayout
      title="Studio Bookings"
      description="Manage studio reservations and schedules"
      showBackButton
      backHref="/admin/studio"
    >
      <div className="mx-auto w-full max-w-6xl p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">Studio Bookings</h1>
            <p className="text-muted-foreground mt-1">Manage studio reservations and schedules</p>
          </div>
          <Link href="/admin/studio">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Building2 className="h-4 w-4" />
              Manage Studios
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Bookings"
            value={stats.total.toString()}
            change="+8% from last month"
            changeType="positive"
            icon={Calendar}
            delay={0}
          />
          <MetricCard
            title="Confirmed"
            value={stats.confirmed.toString()}
            change={`${stats.total > 0 ? ((stats.confirmed / stats.total) * 100).toFixed(0) : 0}% of total`}
            changeType="positive"
            icon={CheckCircle}
            delay={0.1}
          />
          <MetricCard
            title="Pending"
            value={stats.pending.toString()}
            change="Awaiting confirmation"
            changeType="positive"
            icon={Clock}
            delay={0.2}
          />
          <MetricCard
            title="Total Revenue"
            value={`$${stats.revenue.toLocaleString()}`}
            change="+15% from last month"
            changeType="positive"
            icon={DollarSign}
            delay={0.3}
          />
        </div>

        <Tabs defaultValue="calendar" className="space-y-4">
          <TabsList>
            <TabsTrigger value="calendar" className="gap-2">
              <Calendar className="h-4 w-4" />
              Calendar View
            </TabsTrigger>
            <TabsTrigger value="list" className="gap-2">
              <List className="h-4 w-4" />
              List View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-4">
            <CalendarView bookings={bookings} onBookingClick={handleBookingClick} />
          </TabsContent>

          <TabsContent value="list" className="space-y-4">
            <BookingListView bookings={bookings} onBookingClick={handleBookingClick} />
          </TabsContent>
        </Tabs>

        <BookingDetailModal
          booking={selectedBooking}
          studio={selectedStudio}
          open={isDetailModalOpen}
          onOpenChange={setIsDetailModalOpen}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          onRefund={handleRefund}
        />
      </div>
    </AdminLayout>
  )
}

