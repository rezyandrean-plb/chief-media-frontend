'use client'

import { Calendar, Clock, MapPin, Users, DollarSign, CheckCircle, XCircle, RefreshCw, Mail } from "lucide-react"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import type { Booking, Studio } from "@/types/studio"

interface BookingDetailModalProps {
  booking: Booking | null
  studio: Studio | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (bookingId: string) => void
  onCancel: (bookingId: string) => void
  onRefund: (bookingId: string) => void
}

export function BookingDetailModal({
  booking,
  studio,
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  onRefund,
}: BookingDetailModalProps) {
  if (!booking || !studio) return null

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
          <DialogDescription>Booking ID: {booking.id}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Status</div>
              {getStatusBadge(booking.status)}
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Payment</div>
              {getPaymentBadge(booking.paymentStatus)}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Studio Information
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">{studio.name}</span>
              </div>
              <div className="text-muted-foreground">{studio.description}</div>
              <div className="text-muted-foreground">Location: {studio.location}</div>
              <div className="text-muted-foreground">Capacity: {studio.capacity} people</div>
              <div className="text-muted-foreground">Size: {studio.size}</div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Booking User
            </h3>
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={booking.userAvatar || "/placeholder.svg"} alt={booking.userName} />
                <AvatarFallback>
                  {booking.userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{booking.userName}</div>
                <div className="text-sm text-muted-foreground">{booking.userEmail}</div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Date &amp; Time
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>
                  {new Date(booking.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>
                  {booking.startTime} - {booking.endTime}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-3">Equipment Requested</h3>
            {booking.equipment.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {booking.equipment.map((item, index) => (
                  <Badge key={index} variant="outline">
                    {item}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No equipment requested</p>
            )}
          </div>

          <Separator />

          {booking.guests.length > 0 && (
            <>
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Guest Invites ({booking.guests.length})
                </h3>
                <div className="space-y-2">
                  {booking.guests.map((guest) => (
                    <div key={guest.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">{guest.name}</div>
                          <div className="text-xs text-muted-foreground">{guest.email}</div>
                        </div>
                      </div>
                      <Badge variant={guest.status === "confirmed" ? "default" : "secondary"}>{guest.status}</Badge>
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
            </>
          )}

          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Payment Information
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Hourly Rate:</span>
                <span className="font-medium">${studio.hourlyRate}/hour</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-medium">
                  {(() => {
                    const [startHours] = booking.startTime.split(":").map(Number)
                    const [endHours] = booking.endTime.split(":").map(Number)
                    const hours = Math.max(endHours - startHours, 0)
                    return `${hours} ${hours === 1 ? "hour" : "hours"}`
                  })()}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between text-base">
                <span className="font-semibold">Total Amount:</span>
                <span className="font-bold text-primary">${booking.totalAmount}</span>
              </div>
            </div>
          </div>

          {booking.notes && (
            <>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Notes</h3>
                <p className="text-sm text-muted-foreground">{booking.notes}</p>
              </div>
            </>
          )}

          <Separator />

          <div className="flex gap-2 justify-end flex-wrap">
            {booking.status === "pending" && (
              <Button onClick={() => onConfirm(booking.id)} className="gap-2">
                <CheckCircle className="h-4 w-4" />
                Confirm Booking
              </Button>
            )}
            {(booking.status === "pending" || booking.status === "confirmed") && (
              <Button variant="destructive" onClick={() => onCancel(booking.id)} className="gap-2">
                <XCircle className="h-4 w-4" />
                Cancel Booking
              </Button>
            )}
            {booking.status === "cancelled" && booking.paymentStatus === "paid" && (
              <Button variant="outline" onClick={() => onRefund(booking.id)} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Process Refund
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}