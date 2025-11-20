'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/components/AdminLayout';
import { 
  Users, 
  Building2, 
  BarChart3, 
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  Database,
  Award,
  CheckCircle2,
  Clock,
  Search,
  RefreshCw,
  Zap,
  ArrowRight
} from 'lucide-react';

interface Vendor {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  specialty: string;
  status: string;
  rating: number;
  reviews: number;
  createdAt: string;
}

interface VendorEnquiry {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
  serviceType: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [enquiries, setEnquiries] = useState<VendorEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [queryFilter, setQueryFilter] = useState<'all' | 'active' | 'pending'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch data from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [vendorsRes, enquiriesRes] = await Promise.all([
          fetch('/api/vendors'),
          fetch('/api/vendor-enquiries')
        ]);

        if (vendorsRes.ok) {
          const vendorsData = await vendorsRes.json();
          setVendors(vendorsData.data || []);
        }

        if (enquiriesRes.ok) {
          const enquiriesData = await enquiriesRes.json();
          setEnquiries(enquiriesData.data || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate real stats from database
  const totalVendors = vendors.length;
  const activeVendors = vendors.filter(v => v.status === 'active' || v.status === 'approved').length;
  const pendingVendors = vendors.filter(v => v.status === 'pending').length;
  const totalEnquiries = enquiries.length;


  const pendingEnquiries = enquiries.filter(e => e.status === 'pending').length;
  const avgRating = vendors.length > 0 
    ? (vendors.reduce((sum, v) => sum + (v.rating || 0), 0) / vendors.length).toFixed(1)
    : '0.0';
  const totalReviews = vendors.reduce((sum, v) => sum + (v.reviews || 0), 0);

  const stats = [
    {
      title: 'Total Vendors',
      value: totalVendors.toString(),
      description: 'Vendors in the system',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Vendors',
      value: activeVendors.toString(),
      description: 'Currently active vendors',
      icon: Building2,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Pending Approval',
      value: pendingVendors.toString(),
      description: 'Vendors awaiting approval',
      icon: BarChart3,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Total Enquiries',
      value: totalEnquiries.toString(),
      description: 'Vendor applications received',
      icon: Settings,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  // Filter vendors based on query
  const filteredVendors = vendors.filter(vendor => {
    const matchesStatus = queryFilter === 'all' || vendor.status === queryFilter;
    const matchesSearch = searchQuery === '' || 
      vendor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.email?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const quickActions = [
    {
      title: 'Manage Vendors',
      description: 'View, edit, and manage vendor profiles',
      icon: Users,
      href: '/admin/vendors',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Add New Vendor',
      description: 'Create a new vendor profile',
      icon: Plus,
      href: '/admin/vendors',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'View Analytics',
      description: 'View vendor performance metrics',
      icon: BarChart3,
      href: '#',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'System Settings',
      description: 'Configure system preferences',
      icon: Settings,
      href: '#',
      color: 'bg-gray-500 hover:bg-gray-600'
    }
  ];

  return (
    <AdminLayout 
      title="Admin Dashboard"
      description="Manage your vendor platform"
    >
      <div className="p-6">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#273f4f] mb-2">
                Welcome to Admin Dashboard
              </h1>
              <p className="text-[#273f4f]/80">
                Manage vendors, view analytics, and configure your platform settings.
              </p>
            </div>

            {/* Presentation Summary Section */}
            <Card className="mb-8 bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-[#273F4F] flex items-center gap-2">
                    <Award className="h-6 w-6 text-[#03809C]" />
                    Platform Summary
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Platform Growth</p>
                        <p className="text-2xl font-bold text-[#273F4F]">{totalVendors} Vendors</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {activeVendors} active • {pendingVendors} pending
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-purple-50 rounded-lg">
                        <Users className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">New Applications</p>
                        <p className="text-2xl font-bold text-[#273F4F]">{totalEnquiries}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {pendingEnquiries} awaiting review
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-green-50 rounded-lg">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Approval Rate</p>
                        <p className="text-2xl font-bold text-[#273F4F]">
                          {totalVendors > 0 ? Math.round((activeVendors / totalVendors) * 100) : 0}%
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Active vendor ratio
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-all duration-300">
                    <h4 className="font-semibold text-[#273F4F] mb-2 flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-[#03809C]" />
                      Key Highlights
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• KW-Exclusive Media Ecosystem</li>
                      <li>• Verified Vendor Network</li>
                      <li>• Data-Driven Analytics</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-all duration-300">
                    <h4 className="font-semibold text-[#273F4F] mb-2 flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-[#03809C]" />
                      Performance Metrics
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Average Rating: {avgRating}/5.0</li>
                      <li>• Total Reviews: {totalReviews}</li>
                      <li>• Active Rate: {totalVendors > 0 ? Math.round((activeVendors / totalVendors) * 100) : 0}%</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-all duration-300">
                    <h4 className="font-semibold text-[#273F4F] mb-2 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-[#03809C]" />
                      Growth Indicators
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• {totalEnquiries} New Applications</li>
                      <li>• {pendingEnquiries} Pending Reviews</li>
                      <li>• {totalVendors} Total Platform Vendors</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <Card className="mb-8 bg-white">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:bg-gray-100 hover:border-[#03809C]/30 transition-all duration-300"
                    >
                      <div className="flex items-center mb-4">
                        <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                          <stat.icon className={`h-8 w-8 ${stat.color}`} />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
                        <p className="text-3xl font-bold text-[#273F4F] mb-2">{stat.value}</p>
                        <p className="text-xs text-gray-500">{stat.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mb-8 bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#273F4F] flex items-center gap-2">
                  <Zap className="h-6 w-6 text-[#03809C]" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {quickActions.map((action, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:bg-gray-100 hover:border-[#03809C]/30 transition-all duration-300 cursor-pointer group"
                      onClick={() => router.push(action.href)}
                    >
                      <div className="flex items-center mb-4">
                        <div className={`p-3 rounded-lg ${action.color} transition-colors`}>
                          <action.icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-[#273F4F] mb-2 group-hover:text-[#03809C] transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {action.description}
                      </p>
                      <div className="flex items-center text-[#03809C] group-hover:text-[#026B7A] transition-colors">
                        <span className="text-sm font-medium">Access</span>
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Database Query Section */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-[#03809C]" />
                    <CardTitle>Database Query & Live Data</CardTitle>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setLoading(true);
                      Promise.all([
                        fetch('/api/vendors').then(r => r.json()),
                        fetch('/api/vendor-enquiries').then(r => r.json())
                      ]).then(([vendorsData, enquiriesData]) => {
                        setVendors(vendorsData.data || []);
                        setEnquiries(enquiriesData.data || []);
                        setLoading(false);
                      });
                    }}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Query Filters */}
                <div className="mb-6 flex flex-wrap gap-4 items-center">
                  <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search vendors..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#03809C] focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={queryFilter === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setQueryFilter('all')}
                      className={queryFilter === 'all' ? 'bg-[#03809C] text-white' : ''}
                    >
                      All ({vendors.length})
                    </Button>
                    <Button
                      variant={queryFilter === 'active' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setQueryFilter('active')}
                      className={queryFilter === 'active' ? 'bg-[#03809C] text-white' : ''}
                    >
                      Active ({activeVendors})
                    </Button>
                    <Button
                      variant={queryFilter === 'pending' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setQueryFilter('pending')}
                      className={queryFilter === 'pending' ? 'bg-[#03809C] text-white' : ''}
                    >
                      Pending ({pendingVendors})
                    </Button>
                  </div>
                </div>

                {/* Query Results Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b-2 border-gray-200">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Vendor Name</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Company</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Specialty</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Rating</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {loading ? (
                        <tr>
                          <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                            <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
                            Loading data...
                          </td>
                        </tr>
                      ) : filteredVendors.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                            No vendors found matching your criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredVendors.slice(0, 10).map((vendor) => (
                          <tr key={vendor.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-900 font-mono">#{vendor.id}</td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{vendor.name || 'N/A'}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{vendor.company || 'N/A'}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{vendor.email || 'N/A'}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{vendor.specialty || 'General'}</td>
                            <td className="px-4 py-3 text-sm">
                              <div className="flex items-center gap-1">
                                <span className="font-semibold text-gray-900">{vendor.rating?.toFixed(1) || '0.0'}</span>
                                <span className="text-yellow-500">⭐</span>
                                <span className="text-gray-500 text-xs">({vendor.reviews || 0})</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                vendor.status === 'active' || vendor.status === 'approved'
                                  ? 'bg-green-100 text-green-800'
                                  : vendor.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {vendor.status || 'pending'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => router.push(`/admin/vendors`)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => router.push(`/admin/vendors`)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {!loading && filteredVendors.length > 10 && (
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">
                      Showing 10 of {filteredVendors.length} results. 
                      <Button
                        variant="link"
                        onClick={() => router.push('/admin/vendors')}
                        className="ml-2"
                      >
                        View All →
                      </Button>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loading ? (
                    <div className="text-center py-4 text-gray-500">
                      <RefreshCw className="h-5 w-5 animate-spin mx-auto mb-2" />
                      Loading activity...
                    </div>
                  ) : (
                    <>
                      {vendors.slice(0, 3).map((vendor, index) => (
                        <div key={vendor.id} className="flex items-center space-x-4">
                          <div className={`p-2 rounded-full ${
                            vendor.status === 'active' || vendor.status === 'approved'
                              ? 'bg-green-100'
                              : 'bg-yellow-100'
                          }`}>
                            {vendor.status === 'active' || vendor.status === 'approved' ? (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            ) : (
                              <Clock className="h-4 w-4 text-yellow-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              Vendor "{vendor.name || vendor.company || 'Unknown'}" 
                              {vendor.status === 'active' || vendor.status === 'approved' 
                                ? ' is active' 
                                : ' is pending approval'}
                            </p>
                            <p className="text-xs text-gray-500">
                              {vendor.createdAt 
                                ? new Date(vendor.createdAt).toLocaleString()
                                : 'Recently'}
                            </p>
                          </div>
                        </div>
                      ))}
                      {vendors.length === 0 && (
                        <div className="text-center py-4 text-gray-500">
                          No recent activity to display.
                        </div>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
      </div>
    </AdminLayout>
  );
}
