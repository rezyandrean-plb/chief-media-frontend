'use client'

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Booking } from "@/types/studio"

type ViewMode = "day" | "week" | "month"

interface CalendarViewProps {
  bookings: Booking[]
  onBookingClick: (booking: Booking) => void
}

export function CalendarView({ bookings, onBookingClick }: CalendarViewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("week")
  const [currentDate, setCurrentDate] = useState(new Date())

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (viewMode === "day") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1))
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7))
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1))
    }
    setCurrentDate(newDate)
  }

  const getWeekDates = () => {
    const dates: Date[] = []
    const start = new Date(currentDate)
    start.setDate(start.getDate() - start.getDay())

    for (let i = 0; i < 7; i++) {
      const date = new Date(start)
      date.setDate(start.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const getMonthDates = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - startDate.getDay())

    const endDate = new Date(lastDay)
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()))

    const dates: Date[] = []
    const current = new Date(startDate)

    while (current <= endDate) {
      dates.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }

    return dates
  }

  const getBookingsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return bookings.filter((b) => b.date === dateStr)
  }

  const formatDateHeader = () => {
    if (viewMode === "day") {
      return currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } else if (viewMode === "week") {
      const weekDates = getWeekDates()
      return `${weekDates[0].toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${weekDates[6].toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
    } else {
      return currentDate.toLocaleDateString("en-US", { year: "numeric", month: "long" })
    }
  }

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-secondary/20 border-secondary text-secondary-foreground"
      case "pending":
        return "bg-muted/20 border-muted text-muted-foreground"
      case "cancelled":
        return "bg-destructive/20 border-destructive text-destructive-foreground"
      case "completed":
        return "bg-primary/20 border-primary text-primary-foreground"
      default:
        return "bg-muted"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => navigateDate("prev")} aria-label="Previous">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold min-w-[250px] text-center">{formatDateHeader()}</h2>
          <Button variant="outline" size="icon" onClick={() => navigateDate("next")} aria-label="Next">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant={viewMode === "day" ? "default" : "outline"} size="sm" onClick={() => setViewMode("day")}>
            Day
          </Button>
          <Button variant={viewMode === "week" ? "default" : "outline"} size="sm" onClick={() => setViewMode("week")}>
            Week
          </Button>
          <Button variant={viewMode === "month" ? "default" : "outline"} size="sm" onClick={() => setViewMode("month")}>
            Month
          </Button>
        </div>
      </div>

      {viewMode === "week" && (
        <div className="grid grid-cols-7 gap-2">
          {getWeekDates().map((date, index) => {
            const dayBookings = getBookingsForDate(date)
            const isToday = date.toDateString() === new Date().toDateString()

            return (
              <Card key={index} className={cn("p-3 min-h-[200px]", isToday && "ring-2 ring-primary")}>
                <div className="text-center mb-2">
                  <div className="text-xs text-muted-foreground">{date.toLocaleDateString("en-US", { weekday: "short" })}</div>
                  <div className={cn("text-lg font-semibold", isToday && "text-primary")}>{date.getDate()}</div>
                </div>
                <div className="space-y-1">
                  {dayBookings.map((booking) => (
                    <button
                      key={booking.id}
                      onClick={() => onBookingClick(booking)}
                      className={cn("w-full text-left p-2 rounded text-xs border transition-colors hover:opacity-80", getStatusColor(booking.status))}
                    >
                      <div className="font-medium truncate">{booking.studioName}</div>
                      <div className="text-xs opacity-90">
                        {booking.startTime} - {booking.endTime}
                      </div>
                      <div className="text-xs opacity-75 truncate">{booking.userName}</div>
                    </button>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>
      )}

      {viewMode === "day" && (
        <Card className="p-4">
          <div className="space-y-2">
            {getBookingsForDate(currentDate).length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No bookings for this day</p>
            ) : (
              getBookingsForDate(currentDate).map((booking) => (
                <button
                  key={booking.id}
                  onClick={() => onBookingClick(booking)}
                  className={cn("w-full text-left p-4 rounded border transition-colors hover:opacity-80", getStatusColor(booking.status))}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-semibold">{booking.studioName}</div>
                      <div className="text-sm mt-1">
                        {booking.startTime} - {booking.endTime}
                      </div>
                      <div className="text-sm mt-1">{booking.userName}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">${booking.totalAmount}</div>
                      <div className="text-xs capitalize mt-1">{booking.status}</div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </Card>
      )}

      {viewMode === "month" && (
        <Card className="p-4">
          <div className="space-y-2">
            <div className="grid grid-cols-7 gap-2 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-sm font-semibold text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {getMonthDates().map((date, index) => {
                const dayBookings = getBookingsForDate(date)
                const isToday = date.toDateString() === new Date().toDateString()
                const isCurrentMonth = date.getMonth() === currentDate.getMonth()

                return (
                  <Card
                    key={index}
                    className={cn("p-2 min-h-[100px] transition-colors", isToday && "ring-2 ring-primary", !isCurrentMonth && "bg-muted/30")}
                  >
                    <div className="text-right mb-1">
                      <span
                        className={cn(
                          "text-sm font-medium",
                          isToday && "bg-primary text-primary-foreground rounded-full px-2 py-1",
                          !isCurrentMonth && "text-muted-foreground",
                        )}
                      >
                        {date.getDate()}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {dayBookings.slice(0, 2).map((booking) => (
                        <button
                          key={booking.id}
                          onClick={() => onBookingClick(booking)}
                          className={cn("w-full text-left p-1 rounded text-xs border transition-colors hover:opacity-80", getStatusColor(booking.status))}
                        >
                          <div className="font-medium truncate text-xs">{booking.studioName}</div>
                          <div className="text-[10px] opacity-90">{booking.startTime}</div>
                        </button>
                      ))}
                      {dayBookings.length > 2 && <div className="text-[10px] text-muted-foreground text-center">+{dayBookings.length - 2} more</div>}
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

