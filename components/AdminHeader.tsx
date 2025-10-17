'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  Search, 
  User, 
  Settings,
  LogOut,
  Home
} from 'lucide-react';
import { useState } from 'react';

interface AdminHeaderProps {
  title: string;
  description?: string;
  showBackButton?: boolean;
  backHref?: string;
}

export default function AdminHeader({ 
  title, 
  description, 
  showBackButton = false, 
  backHref = '/admin' 
}: AdminHeaderProps) {
  const router = useRouter();
  const [notifications] = useState(3); // Mock notification count

  const handleLogout = () => {
    // Add logout logic here
    router.push('/');
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push(backHref)}
                className="text-gray-600 hover:text-gray-900"
              >
                ← Back
              </Button>
            )}
            <div>
              <h1 className="text-xl font-semibold text-[#273f4f]">
                {title}
              </h1>
              {description && (
                <p className="text-gray-600 mt-1">
                  {description}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B40101] focus:border-transparent text-sm"
              />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5 text-gray-600" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>

            {/* User Menu */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5 text-gray-600" />
              </Button>
              
              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5 text-gray-600" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-600"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>

            {/* Home Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/')}
              className="text-[#B40101] border-[#B40101] hover:bg-[#B40101] hover:text-white"
            >
              <Home className="h-4 w-4 mr-2" />
              View Site
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
