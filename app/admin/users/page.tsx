"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/AdminLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useAdminAuth } from "@/hooks/use-admin-auth"

type AdminUserRow = {
  id: number
  email: string
  name: string
  role: string
  createdAt: string
  passwordSet: boolean
}

export default function AdminUsersPage() {
  const { isAuthenticated, isLoading, requireAuth } = useAdminAuth()
  const [users, setUsers] = useState<AdminUserRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!isLoading) {
      requireAuth()
    }
  }, [isLoading, requireAuth])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/users")
        if (!res.ok) throw new Error("Failed to fetch users")
        const { data } = await res.json()
        setUsers(
          data.map((u: any) => ({
            ...u,
            createdAt: new Date(u.createdAt).toISOString(),
          }))
        )
      } catch (e: any) {
        setError(e.message || "Failed to load users")
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F37521] mx-auto mb-4"></div>
          <p className="text-[#273F4F]">Loading users...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) return null

  return (
    <AdminLayout title="Users" description="Manage registered users">
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Registered Users</CardTitle>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">{error}</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="font-medium">{u.name}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell className="capitalize">{u.role}</TableCell>
                      <TableCell>{new Date(u.createdAt).toLocaleString()}</TableCell>
                      <TableCell>
                        {u.passwordSet ? (
                          <Badge className="bg-green-600 hover:bg-green-600">Password created</Badge>
                        ) : (
                          <Badge className="bg-yellow-600 hover:bg-yellow-600">Pending Password</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}


