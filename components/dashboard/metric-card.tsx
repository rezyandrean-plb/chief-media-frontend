"use client"

import { Card, CardContent } from "@/components/ui/card"

import type { LucideIcon } from "lucide-react"

import { motion } from "framer-motion"



interface MetricCardProps {

  title: string

  value: string

  change: string

  changeType: "positive" | "negative"

  icon: LucideIcon

  delay?: number

}



export function MetricCard({ title, value, change, changeType, icon: Icon, delay = 0 }: MetricCardProps) {

  return (

    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay }}>

      <Card className="overflow-hidden rounded-2xl border-gray-200 shadow-sm transition-shadow hover:shadow-md">

        <CardContent className="p-6">

          <div className="flex items-start justify-between">

            <div className="space-y-2">

              <p className="text-sm font-medium text-gray-600">{title}</p>

              <p className="text-3xl font-bold text-gray-900">{value}</p>

              <p className={`text-sm font-medium ${changeType === "positive" ? "text-green-600" : "text-red-600"}`}>

                {change}

              </p>

            </div>

            <div className="rounded-full bg-gradient-to-br from-[#f37521]/10 to-[#BBDEFB]/10 p-3">

              <Icon className="h-6 w-6 text-[#f37521]" />

            </div>

          </div>

        </CardContent>

      </Card>

    </motion.div>

  )

}



