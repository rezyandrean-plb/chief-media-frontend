'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Check, X, RefreshCw, Eye } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface Enquiry {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  businessName?: string | null
  serviceType: string
  experience: string
  location: string
  portfolio?: string | null
  description: string
  agreedToTerms: boolean
  address?: string | null
  linkedin?: string | null
  status: string
  convertedToVendor?: number | null
  createdAt: string
}

export default function AdminVendorEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Enquiry | null>(null)

  const fetchEnquiries = async () => {
    setLoading(true)
    const res = await fetch('/api/vendor-enquiries')
    const json = await res.json()
    setEnquiries(json.data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchEnquiries()
  }, [])

  const filtered = enquiries.filter((e) => {
    const q = search.toLowerCase()
    return (
      e.firstName.toLowerCase().includes(q) ||
      e.lastName.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.phone.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q) ||
      e.serviceType.toLowerCase().includes(q) ||
      (e.businessName || '').toLowerCase().includes(q)
    )
  })

  const updateStatus = async (id: number, status: 'approved' | 'rejected') => {
    await fetch(`/api/vendor-enquiries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
    await fetchEnquiries()
  }

  const approveAndConvert = async (id: number) => {
    await fetch(`/api/vendor-enquiries/${id}?action=approve`, { method: 'POST' })
    await fetchEnquiries()
  }

  return (
    <AdminLayout 
      title="Vendor Enquiries" 
      description="Review and manage enquiries submitted by vendors"
      showBackButton={true}
      backHref="/admin/vendors"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 max-w-md">
            <Input placeholder="Search by name, company, service, or email" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Button variant="outline" className="ml-4" onClick={fetchEnquiries}>
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Enquiries ({filtered.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B40101]"></div>
                <span className="ml-2 text-gray-600">Loading enquiries...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filtered.map((e) => (
                      <tr key={e.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{e.firstName} {e.lastName}</div>
                          <div className="text-xs text-gray-500">{e.businessName || '—'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div>{e.email}</div>
                          <div className="text-xs text-gray-500">{e.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{e.serviceType} <span className="text-xs text-gray-500">({e.experience} yrs)</span></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{e.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <Badge variant={e.status === 'approved' ? 'default' : e.status === 'rejected' ? 'destructive' : 'secondary'}>
                            {e.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline" onClick={() => setSelected(e)}>
                              <Eye className="h-4 w-4 mr-1" /> More details
                            </Button>
                            {e.status !== 'approved' && (
                              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => approveAndConvert(e.id)}>
                                <Check className="h-4 w-4 mr-1" /> Approve
                              </Button>
                            )}
                            {e.status !== 'rejected' && (
                              <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => updateStatus(e.id, 'rejected')}>
                                <X className="h-4 w-4 mr-1" /> Reject
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Enquiry Details</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500">First Name</div>
                  <div className="text-sm font-medium">{selected.firstName}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Last Name</div>
                  <div className="text-sm font-medium">{selected.lastName}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Email</div>
                  <div className="text-sm font-medium break-all">{selected.email}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Phone</div>
                  <div className="text-sm font-medium">{selected.phone}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Business Name</div>
                  <div className="text-sm font-medium">{selected.businessName || '—'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Service Type</div>
                  <div className="text-sm font-medium">{selected.serviceType}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Experience</div>
                  <div className="text-sm font-medium">{selected.experience}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Location</div>
                  <div className="text-sm font-medium">{selected.location}</div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-xs text-gray-500">Portfolio</div>
                  <div className="text-sm font-medium break-all">{selected.portfolio || '—'}</div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-xs text-gray-500">Address</div>
                  <div className="text-sm font-medium">{selected.address || '—'}</div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-xs text-gray-500">LinkedIn</div>
                  <div className="text-sm font-medium break-all">{selected.linkedin || '—'}</div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-xs text-gray-500">Description</div>
                  <div className="text-sm">{selected.description}</div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-gray-500">Submitted</div>
                <div className="text-xs text-gray-700">{new Date(selected.createdAt).toLocaleString()}</div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}
