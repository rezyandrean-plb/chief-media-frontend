'use client';

import { useRouter } from 'next/navigation';
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
  Trash2
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();

  const stats = [
    {
      title: 'Total Vendors',
      value: '15',
      description: 'Active vendors in the system',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Active Vendors',
      value: '12',
      description: 'Currently active vendors',
      icon: Building2,
      color: 'text-green-600'
    },
    {
      title: 'Pending Approval',
      value: '3',
      description: 'Vendors awaiting approval',
      icon: BarChart3,
      color: 'text-yellow-600'
    },
    {
      title: 'Total Services',
      value: '45',
      description: 'Available services offered',
      icon: Settings,
      color: 'text-purple-600'
    }
  ];

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

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900">{stat.title}</h3>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-gray-500">{stat.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#273f4f] mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickActions.map((action, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className={`p-3 rounded-lg ${action.color} text-white`}>
                          <action.icon className="h-6 w-6" />
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {action.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {action.description}
                      </p>
                      <Button
                        onClick={() => router.push(action.href)}
                        className="w-full"
                        variant="outline"
                      >
                        {action.title}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-green-100 rounded-full">
                      <Plus className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        New vendor "Elite Photography Studios" was added
                      </p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Edit className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Vendor "SkyView Drone Services" was updated
                      </p>
                      <p className="text-xs text-gray-500">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-yellow-100 rounded-full">
                      <Eye className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Vendor "Virtual Tour Pro" status changed to pending
                      </p>
                      <p className="text-xs text-gray-500">6 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
      </div>
    </AdminLayout>
  );
}
