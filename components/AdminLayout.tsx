'use client';

import { ReactNode } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  showBackButton?: boolean;
  backHref?: string;
}

export default function AdminLayout({ 
  children, 
  title, 
  description, 
  showBackButton = false, 
  backHref = '/admin' 
}: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      
      {/* Main content area */}
      <div className="lg:pl-64">
        <AdminHeader 
          title={title}
          description={description}
          showBackButton={showBackButton}
          backHref={backHref}
        />
        
        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                © {new Date().getFullYear()} Chief Media. All rights reserved.
              </div>
              <div className="text-sm text-gray-500">
                Admin Panel v1.0
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
