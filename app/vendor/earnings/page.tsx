"use client"

import { useAuthGuard } from "@/hooks/use-auth-guard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, TrendingUp, Download, CreditCard, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { useState } from "react"

export default function VendorEarningsPage() {
  useAuthGuard({ requireRole: "vendor" })

  const [chartPeriod, setChartPeriod] = useState<"monthly" | "yearly">("monthly")

  const stats = [
    {
      title: "Total Earnings",
      value: "$12,450",
      change: "+15.3%",
      changeType: "positive",
      icon: DollarSign,
      description: "This month",
    },
    {
      title: "Available Balance",
      value: "$3,280",
      change: "Ready to withdraw",
      changeType: "neutral",
      icon: CreditCard,
      description: "Available now",
    },
    {
      title: "Pending Payments",
      value: "$1,850",
      change: "3 payments",
      changeType: "neutral",
      icon: Clock,
      description: "Processing",
    },
    {
      title: "Monthly Growth",
      value: "+23%",
      change: "vs last month",
      changeType: "positive",
      icon: TrendingUp,
      description: "Revenue increase",
    },
  ]

  const transactions = [
    {
      id: 1,
      client: "Sarah Johnson",
      project: "Luxury Home Photography",
      amount: 850,
      status: "completed",
      date: "2024-01-15",
      paymentMethod: "Credit Card",
    },
    {
      id: 2,
      client: "Mike Chen",
      project: "Commercial Property Video",
      amount: 1200,
      status: "pending",
      date: "2024-01-14",
      paymentMethod: "Bank Transfer",
    },
    {
      id: 3,
      client: "Emma Davis",
      project: "3D Virtual Tour",
      amount: 650,
      status: "completed",
      date: "2024-01-12",
      paymentMethod: "PayPal",
    },
    {
      id: 4,
      client: "Robert Wilson",
      project: "Drone Aerial Photography",
      amount: 950,
      status: "processing",
      date: "2024-01-10",
      paymentMethod: "Credit Card",
    },
    {
      id: 5,
      client: "Lisa Anderson",
      project: "Interior Design Photography",
      amount: 750,
      status: "completed",
      date: "2024-01-08",
      paymentMethod: "Bank Transfer",
    },
  ]

  const monthlyData = [
    { month: "Jan 2024", earnings: 12450, projects: 18, period: "Jan" },
    { month: "Dec 2023", earnings: 10200, projects: 15, period: "Dec" },
    { month: "Nov 2023", earnings: 9800, projects: 14, period: "Nov" },
    { month: "Oct 2023", earnings: 11200, projects: 16, period: "Oct" },
    { month: "Sep 2023", earnings: 8900, projects: 12, period: "Sep" },
    { month: "Aug 2023", earnings: 10500, projects: 15, period: "Aug" },
    { month: "Jul 2023", earnings: 9200, projects: 13, period: "Jul" },
    { month: "Jun 2023", earnings: 11800, projects: 17, period: "Jun" },
    { month: "May 2023", earnings: 10900, projects: 16, period: "May" },
    { month: "Apr 2023", earnings: 8700, projects: 12, period: "Apr" },
    { month: "Mar 2023", earnings: 9500, projects: 14, period: "Mar" },
    { month: "Feb 2023", earnings: 8200, projects: 11, period: "Feb" },
  ]

  const yearlyData = [
    { year: "2024", earnings: 45650, projects: 67, period: "2024" },
    { year: "2023", earnings: 128400, projects: 187, period: "2023" },
    { year: "2022", earnings: 98200, projects: 145, period: "2022" },
    { year: "2021", earnings: 76800, projects: 112, period: "2021" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "processing":
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#273F4F] text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Earnings</h1>
              <p className="text-gray-300 text-base">Track your income and manage payments</p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-primary hover:bg-[#E06A1E] text-white">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 pb-2.5">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card className="shadow-none border-0 bg-[rgba(252,235,220,0.5)]" key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-[#273F4F]">{stat.value}</p>
                    <p
                      className={`text-sm mt-1 ${
                        stat.changeType === "positive"
                          ? "text-green-700"
                          : stat.changeType === "negative"
                            ? "text-red-600"
                            : "text-gray-600"
                      }`}
                    >
                      {stat.change}
                    </p>
                  </div>
                  <div className="p-3 bg-[#F37521]/10 rounded-full">
                    <stat.icon className="h-6 w-6 text-[#F37521]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-[rgba(39,63,79,1)]">
            <TabsTrigger className="shadow-none border-0 bg-[rgba(39,63,79,1)]" value="transactions">
              Recent Transactions
            </TabsTrigger>
            <TabsTrigger className="text-white" value="charts">
              Earnings Charts
            </TabsTrigger>
            <TabsTrigger className="text-white" value="analytics">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transactions">
            <Card className="shadow-none border">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors shadow-none"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-[#F37521]/10 rounded-full">
                          <DollarSign className="h-4 w-4 text-[#F37521]" />
                        </div>
                        <div>
                          <p className="font-medium text-[#273F4F]">{transaction.client}</p>
                          <p className="text-sm text-gray-600">{transaction.project}</p>
                          <p className="text-xs text-gray-500">
                            {transaction.paymentMethod} • {transaction.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className={getStatusColor(transaction.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(transaction.status)}
                            <span className="capitalize">{transaction.status}</span>
                          </div>
                        </Badge>
                        <p className="font-bold text-[#273F4F]">${transaction.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="charts">
            <Card className="border shadow-none">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Earnings Overview</CardTitle>
                  <Select value={chartPeriod} onValueChange={(value: "monthly" | "yearly") => setChartPeriod(value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartPeriod === "monthly" ? monthlyData.reverse() : yearlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="period" stroke="#666" fontSize={12} />
                      <YAxis stroke="#666" fontSize={12} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                      <Tooltip
                        formatter={(value: number) => [`$${value.toLocaleString()}`, "Earnings"]}
                        labelFormatter={(label) => (chartPeriod === "monthly" ? `Month: ${label}` : `Year: ${label}`)}
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e0e0e0",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="earnings"
                        stroke="#F37521"
                        strokeWidth={3}
                        dot={{ fill: "#F37521", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: "#F37521", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-[#273F4F] mb-4">Projects Completed</h4>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartPeriod === "monthly" ? monthlyData : yearlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="period" stroke="#666" fontSize={12} />
                        <YAxis stroke="#666" fontSize={12} />
                        <Tooltip
                          formatter={(value: number) => [`${value}`, "Projects"]}
                          labelFormatter={(label) => (chartPeriod === "monthly" ? `Month: ${label}` : `Year: ${label}`)}
                          contentStyle={{
                            backgroundColor: "#fff",
                            border: "1px solid #e0e0e0",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar dataKey="projects" fill="#273F4F" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-none border">
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Credit Card</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#F37521] h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Bank Transfer</span>
                      <span className="font-medium">35%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#273F4F] h-2 rounded-full" style={{ width: "35%" }}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">PayPal</span>
                      <span className="font-medium">20%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gray-400 h-2 rounded-full" style={{ width: "20%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-none">
                <CardHeader>
                  <CardTitle>Top Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white border rounded-lg">
                      <span className="font-medium text-[#273F4F]">Real Estate Photography</span>
                      <span className="text-[#F37521] font-bold">$4,200</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white border rounded-lg">
                      <span className="font-medium text-[#273F4F]">Drone Videography</span>
                      <span className="text-[#F37521] font-bold">$3,800</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white border rounded-lg">
                      <span className="font-medium text-[#273F4F]">3D Virtual Tours</span>
                      <span className="text-[#F37521] font-bold">$2,650</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white border rounded-lg">
                      <span className="font-medium text-[#273F4F]">Interior Photography</span>
                      <span className="text-[#F37521] font-bold">$1,800</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

    </div>
  )
}
