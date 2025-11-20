'use client'

import { useState } from "react"
import { Search, Eye } from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Booking } from "@/types/studio"

interface BookingListViewProps {
  bookings: Booking[]
  onBookingClick: (booking: Booking) => void
}

export function BookingListView({ bookings, onBookingClick }: BookingListViewProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredBookings = bookings.filter((booking) => {
    const query = searchQuery.toLowerCase()
    return (
      booking.studioName.toLowerCase().includes(query) ||
      booking.userName.toLowerCase().includes(query) ||
      booking.id.toLowerCase().includes(query)
    )
  })

  const getStatusBadge = (status: Booking["status"]) => {
    const variants: Record<Booking["status"], { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
      confirmed: { variant: "default", label: "Confirmed" },
      pending: { variant: "secondary", label: "Pending" },
      cancelled: { variant: "destructive", label: "Cancelled" },
      completed: { variant: "outline", label: "Completed" },
    }
    const config = variants[status]
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getPaymentBadge = (status: Booking["paymentStatus"]) => {
    const variants: Record<Booking["paymentStatus"], { className: string; label: string }> = {
      paid: { className: "bg-secondary text-secondary-foreground", label: "Paid" },
      pending: { className: "bg-muted text-muted-foreground", label: "Pending" },
      refunded: { className: "bg-destructive/20 text-destructive", label: "Refunded" },
    }
    const config = variants[status]
    return <Badge className={config.className}>{config.label}</Badge>
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by studio, user, or booking ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Studio</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Date &amp; Time</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                  No bookings found
                </TableCell>
              </TableRow>
            ) : (
              filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-mono text-sm">{booking.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{booking.studioName}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={booking.userAvatar || "/placeholder.svg"} alt={booking.userName} />
                        <AvatarFallback>
                          {booking.userName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">{booking.userName}</div>
                        <div className="text-xs text-muted-foreground">{booking.userEmail}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(booking.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {booking.startTime} - {booking.endTime}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">${booking.totalAmount}</TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell>{getPaymentBadge(booking.paymentStatus)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => onBookingClick(booking)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

