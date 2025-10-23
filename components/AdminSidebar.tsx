'use client';

import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Building2, 
  BarChart3, 
  Settings,
  Home,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { useAdminAuth } from '@/hooks/use-admin-auth';

type NavChild = { name: string; href: string };
interface NavItem {
  name: string;
  href: string;
  icon: typeof Home | typeof Users | typeof BarChart3 | typeof Settings | typeof Building2;
  current: boolean;
  children?: NavChild[];
}

const navigation: ReadonlyArray<NavItem> = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: Home,
    current: false
  },
  {
    name: 'Vendors',
    href: '/admin/vendors',
    icon: Users,
    current: false,
    children: [
      { name: 'Vendor List', href: '/admin/vendors' },
      { name: 'Vendor Enquiries', href: '/admin/vendors/enquiries' }
    ]
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    current: false
  },
  {
    name: 'Users',
    href: '/admin/users',
    icon: Users,
    current: false
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    current: false
  }
] as const;

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const { adminUser, logout } = useAdminAuth();

  const handleNavigation = (href: string) => {
    router.push(href);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  const toggleGroup = (groupName: string) => {
    setOpenGroups(prev => ({ ...prev, [groupName]: !prev[groupName] }));
  };

  const renderNavItem = (item: NavItem, isMobile: boolean) => {
    const isActive = pathname === item.href || (item.children && pathname?.startsWith(item.href));

    if (item.children && item.children.length > 0) {
      const isOpen = openGroups[item.name] ?? false; // default closed

      return (
        <div key={item.name} className="space-y-1">
          <Button
            variant={isActive ? 'default' : 'ghost'}
            className={cn(
              'w-full justify-between text-left',
              isActive
                ? 'bg-[#B40101] text-white hover:bg-[#e0651a]'
                : 'text-gray-700 hover:bg-gray-100'
            )}
            onClick={() => toggleGroup(item.name)}
          >
            <span className="flex items-center">
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </span>
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>

          {isOpen && (
            <div className="ml-8 space-y-1">
              {item.children.map((child: NavChild) => {
                const isChildActive = pathname === child.href;
                return (
                  <Button
                    key={child.name}
                    variant={isChildActive ? 'default' : 'ghost'}
                    className={cn(
                      'w-full justify-start text-left',
                      isChildActive
                        ? 'bg-[#B40101] text-white hover:bg-[#e0651a]'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                    onClick={() => handleNavigation(child.href)}
                  >
                    {child.name}
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    return (
      <Button
        key={item.name}
        variant={isActive ? 'default' : 'ghost'}
        className={cn(
          'w-full justify-start text-left',
          isActive
            ? 'bg-[#B40101] text-white hover:bg-[#e0651a]'
            : 'text-gray-700 hover:bg-gray-100'
        )}
        onClick={() => handleNavigation(item.href)}
      >
        <item.icon className="mr-3 h-5 w-5" />
        {item.name}
      </Button>
    );
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
        </div>
      )}

      {/* Mobile sidebar */}
      <div className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-black/80 rounded flex items-center justify-center">
              <Image
                src="/chiefmedia.png"
                alt="Chief Media"
                width={24}
                height={24}
                className="w-6 h-6 object-contain"
              />
            </div>
            <h2 className="text-lg font-semibold text-[#273f4f]">Admin Panel</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="mt-5 px-2">
          <div className="space-y-1">
            {navigation.map((item) => renderNavItem(item, true))}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-700 hover:bg-gray-100"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:z-40">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          {/* Logo/Header */}
          <div className="flex items-center h-16 px-4 border-b border-gray-200">
            <div className="w-8 h-8 bg-black/80 rounded flex items-center justify-center">
              <Image
                src="/chiefmedia.png"
                alt="Chief Media"
                width={24}
                height={24}
                className="w-6 h-6 object-contain"
              />
            </div>
            <h2 className="ml-2 text-lg font-semibold text-[#273f4f]">Admin Panel</h2>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => renderNavItem(item, false))}
          </nav>

          {/* User info and logout */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center mb-3">
              <div className="h-8 w-8 rounded-full bg-[#B40101] flex items-center justify-center">
                <span className="text-white text-sm font-medium">{(adminUser?.email?.[0] || 'A').toUpperCase()}</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{adminUser?.email ? adminUser.email.split('@')[0] : 'Admin User'}</p>
                <p className="text-xs text-gray-500">{adminUser?.email || 'admin@chiefmedia.com'}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:bg-gray-100"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden">
        <Button
          variant="ghost"
          size="sm"
          className="fixed top-4 left-4 z-50"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </>
  );
}
