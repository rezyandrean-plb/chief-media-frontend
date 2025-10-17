'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  Trash2 as TrashIcon,
  Eye as EyeIcon,
  Check as CheckIcon,
  X as XMarkIcon,
  Building2 as BuildingOfficeIcon,
  Search as MagnifyingGlassIcon,
  Plus as PlusIcon,
  Pencil as PencilIcon,
  Star as StarIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import toast from 'react-hot-toast';
import AdminLayout from '@/components/AdminLayout';

interface Vendor {
  id: number;
  name: string;
  phone: string;
  email: string;
  
  // Frontend-compatible fields
  specialty?: string;
  rating?: number;
  reviews?: number;
  location?: string;
  image?: string;
  profileImage?: string;
  services?: string[];
  priceRange?: string;
  description?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  
  // Legacy fields
  company?: string;
  address?: string;
  website?: string;
  business_hours?: any;
  pricing?: any;
  social_media?: any;
  document_id?: string;
  created_at?: string;
  updated_at?: string;
  published_at?: string;
}

interface VendorFormData {
  name: string;
  phone: string;
  email: string;
  
  // Frontend-compatible fields
  specialty?: string;
  rating?: number;
  reviews?: number;
  location?: string;
  image?: string;
  profileImage?: string;
  services?: string[];
  priceRange?: string;
  description?: string;
  status?: string;
  
  // Legacy fields
  company?: string;
  address?: string;
  website?: string;
  business_hours?: any;
  pricing?: any;
  social_media?: any;
  document_id?: string;
}

const availableServices = [
  'Photography',
  'Video',
  'Drone',
  'Virtual Tours',
  '3D Modeling',
  'Staging Consultation',
  'Commercial',
  'Retail',
  'Historic',
  'Restoration',
  'Modern',
  'Design',
  'Rural',
  'Urban',
  'Condo',
  'Twilight',
  'Night',
  'Editing'
];

// Remove initialVendors since we're fetching from database

export default function AdminVendorsPage() {
  const router = useRouter();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingVendorId, setEditingVendorId] = useState<number | null>(null);
  const [formData, setFormData] = useState<VendorFormData>({
    name: '',
    phone: '',
    email: '',
    specialty: '',
    rating: 5.0,
    reviews: 0,
    location: '',
    image: '',
    profileImage: '',
    services: [],
    priceRange: '',
    description: '',
    status: 'pending',
    company: '',
    address: '',
    website: '',
    business_hours: null,
    pricing: null,
    social_media: null,
    document_id: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Fetch vendors from database
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/vendors');
        if (response.ok) {
          const result = await response.json();
          setVendors(result.data);
        } else {
          toast.error("Failed to fetch vendors");
        }
      } catch (error) {
        console.error('Error fetching vendors:', error);
        toast.error("Failed to fetch vendors");
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, [toast]);

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (vendor.company && vendor.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (vendor.specialty && vendor.specialty.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (vendor.location && vendor.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         vendor.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  // Status color function removed since status is not in database schema

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      specialty: '',
      rating: 5.0,
      reviews: 0,
      location: '',
      image: '',
      profileImage: '',
      services: [],
      priceRange: '',
      description: '',
      status: 'pending',
      company: '',
      address: '',
      website: '',
      business_hours: null,
      pricing: null,
      social_media: null,
      document_id: ''
    });
    setFormErrors({});
  };

  const openCreateForm = () => {
    setIsEditing(false);
    setEditingVendorId(null);
    resetForm();
    setShowForm(true);
  };

  const openEditForm = (vendor: Vendor) => {
    setIsEditing(true);
    setEditingVendorId(vendor.id);
    setFormData({
      name: vendor.name,
      phone: vendor.phone,
      email: vendor.email,
      specialty: vendor.specialty || '',
      rating: vendor.rating || 5.0,
      reviews: vendor.reviews || 0,
      location: vendor.location || '',
      image: vendor.image || '',
      profileImage: vendor.profileImage || '',
      services: vendor.services || [],
      priceRange: vendor.priceRange || '',
      description: vendor.description || '',
      status: vendor.status || 'pending',
      company: vendor.company || '',
      address: vendor.address || '',
      website: vendor.website || '',
      business_hours: vendor.business_hours,
      pricing: vendor.pricing,
      social_media: vendor.social_media,
      document_id: vendor.document_id || ''
    });
    setFormErrors({});
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setEditingVendorId(null);
    resetForm();
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!formData.phone.trim()) errors.phone = 'Phone is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      if (isEditing && editingVendorId) {
        // Update existing vendor
        const response = await fetch(`/api/vendors/${editingVendorId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          const result = await response.json();
          setVendors(prev => prev.map(vendor => 
            vendor.id === editingVendorId ? result.data : vendor
          ));
          console.log('About to show success toast for update');
          toast.success("Vendor updated successfully");
          console.log('Success toast called for update');
        } else {
          throw new Error('Failed to update vendor');
        }
      } else {
        // Create new vendor
        const response = await fetch('/api/vendors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          const result = await response.json();
          setVendors(prev => [...prev, result.data]);
          console.log('About to show success toast for create');
          toast.success("Vendor created successfully");
          console.log('Success toast called for create');
        } else {
          throw new Error('Failed to create vendor');
        }
      }

      closeForm();
    } catch (error) {
      console.error('Error submitting form:', error);
      console.log('About to show error toast');
      toast.error("Error submitting form");
      console.log('Error toast called');
    }
  };

  const handleInputChange = (field: string, value: string | number | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Service functions removed since services are not in database schema

  const handleDeleteVendor = async (vendorId: number) => {
    try {
      const response = await fetch(`/api/vendors/${vendorId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setVendors(prev => prev.filter(vendor => vendor.id !== vendorId));
        toast.success("Vendor deleted successfully");
      } else {
        throw new Error('Failed to delete vendor');
      }
    } catch (error) {
      console.error('Error deleting vendor:', error);
      toast.error("Failed to delete vendor");
    }
  };

  // Status update function removed since status is not in database schema

  return (
    <AdminLayout 
      title="Vendor Management"
      description="Manage vendor profiles and their service offerings"
      showBackButton={true}
      backHref="/admin"
    >
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#273f4f]">
                Vendor Management
              </h1>
              <p className="mt-2 text-[#273f4f]/80">
                Manage vendor profiles and their service offerings
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => {
                  console.log('Test toast button clicked');
                  toast.success("This is a test toast notification");
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Test Toast
              </Button>
              <Button
                onClick={openCreateForm}
                className="bg-[#B40101] hover:bg-[#e0651a] text-white"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Vendor
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BuildingOfficeIcon className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Total Vendors</h3>
                  <p className="text-2xl font-bold text-blue-600">{vendors.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <StarIcon className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Average Rating</h3>
                  <p className="text-2xl font-bold text-yellow-600">
                    {vendors.length > 0 ? (vendors.reduce((sum, v) => sum + (v.rating || 0), 0) / vendors.length).toFixed(1) : '0.0'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search vendors by name, company, or specialties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vendors List */}
        <Card>
          <CardHeader>
            <CardTitle>Vendors ({filteredVendors.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B40101]"></div>
                <span className="ml-2 text-gray-600">Loading vendors...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vendor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Specialty
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reviews
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredVendors.map((vendor) => (
                    <tr key={vendor.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {vendor.profileImage ? (
                              <Image
                                src={vendor.profileImage}
                                alt={`${vendor.name} profile`}
                                width={40}
                                height={40}
                                className="h-10 w-10 rounded-full object-cover border-2 border-gray-200"
                                onError={(e) => {
                                  // Fallback to default icon if image fails to load
                                  e.currentTarget.style.display = 'none';
                                  const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                                  if (nextElement) {
                                    nextElement.style.display = 'flex';
                                  }
                                }}
                              />
                            ) : null}
                            <div 
                              className={`h-10 w-10 rounded-full bg-[#f37521]/10 flex items-center justify-center overflow-hidden ${vendor.profileImage ? 'hidden' : ''}`}
                              style={{ display: vendor.profileImage ? 'none' : 'flex' }}
                            >
                              <div className="w-full h-full flex items-center justify-center">
                                <svg className="h-5 w-5 text-[#f37521]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {vendor.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {vendor.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {vendor.specialty || 'General Services'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {vendor.location || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm font-medium">{vendor.rating || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {vendor.reviews || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {vendor.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedVendor(vendor)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditForm(vendor)}
                            className="text-yellow-600 hover:text-yellow-900"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                                <TrashIcon className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Vendor</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete {vendor.name}? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteVendor(vendor.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
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

        {/* Vendor Form Modal */}
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {isEditing ? 'Edit Vendor' : 'Create New Vendor'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Vendor Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={formErrors.name ? 'border-red-500' : ''}
                    placeholder="Enter vendor name"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="specialty">Specialty</Label>
                  <Input
                    id="specialty"
                    value={formData.specialty || ''}
                    onChange={(e) => handleInputChange('specialty', e.target.value)}
                    placeholder="Enter specialty"
                  />
                </div>
                
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location || ''}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Enter location"
                  />
                </div>
                
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company || ''}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder="Enter company name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address || ''}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter address"
                  />
                </div>
                
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website || ''}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="Enter website URL"
                  />
                </div>
              </div>

              {/* Specialties */}
              <div>
                <Label htmlFor="specialties">Specialties</Label>
                <Textarea
                  id="specialties"
                  value={formData.specialty || ''}
                  onChange={(e) => handleInputChange('specialty', e.target.value)}
                  placeholder="Enter specialty"
                  rows={3}
                />
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={formErrors.email ? 'border-red-500' : ''}
                      placeholder="Enter email address"
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={formErrors.phone ? 'border-red-500' : ''}
                      placeholder="Enter phone number"
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating || ''}
                    onChange={(e) => handleInputChange('rating', parseFloat(e.target.value) || 0)}
                    placeholder="4.5"
                  />
                </div>
                
                <div>
                  <Label htmlFor="reviews">Reviews Count</Label>
                  <Input
                    id="reviews"
                    type="number"
                    value={formData.reviews || ''}
                    onChange={(e) => handleInputChange('reviews', parseInt(e.target.value) || 0)}
                    placeholder="100"
                  />
                </div>
                
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image || ''}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    placeholder="Enter image URL"
                  />
                </div>
                
                <div>
                  <Label htmlFor="profileImage">Profile Image URL</Label>
                  <Input
                    id="profileImage"
                    value={formData.profileImage || ''}
                    onChange={(e) => handleInputChange('profileImage', e.target.value)}
                    placeholder="Enter profile image URL"
                  />
                </div>
                
                <div>
                  <Label htmlFor="priceRange">Price Range</Label>
                  <Input
                    id="priceRange"
                    value={formData.priceRange || ''}
                    onChange={(e) => handleInputChange('priceRange', e.target.value)}
                    placeholder="e.g., $200-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Enter description"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status || 'pending'} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeForm}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#B40101] hover:bg-[#e0651a] text-white"
                >
                  {isEditing ? 'Update Vendor' : 'Create Vendor'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Vendor Detail Modal */}
        {selectedVendor && (
          <Dialog open={!!selectedVendor} onOpenChange={() => setSelectedVendor(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Vendor Details</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {selectedVendor.profileImage ? (
                      <Image
                        src={selectedVendor.profileImage}
                        alt={`${selectedVendor.name} profile`}
                        width={60}
                        height={60}
                        className="h-15 w-15 rounded-full object-cover border-2 border-gray-200"
                      />
                    ) : (
                      <div className="h-15 w-15 rounded-full bg-[#f37521]/10 flex items-center justify-center">
                        <svg className="h-8 w-8 text-[#f37521]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Vendor Information</h3>
                    <p className="text-gray-600">{selectedVendor.name}</p>
                    <p className="text-gray-600">{selectedVendor.company || 'N/A'}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900">Specialties</h3>
                  <p className="text-gray-600">{selectedVendor.specialty || 'N/A'}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900">Contact Information</h3>
                  <p className="text-gray-600">Email: {selectedVendor.email}</p>
                  <p className="text-gray-600">Phone: {selectedVendor.phone}</p>
                  <p className="text-gray-600">Address: {selectedVendor.address || 'N/A'}</p>
                  <p className="text-gray-600">Website: {selectedVendor.website || 'N/A'}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900">Rating & Reviews</h3>
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1">{selectedVendor.rating || 'N/A'}</span>
                    <span className="ml-1 text-gray-500">({selectedVendor.reviews || 0} reviews)</span>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </AdminLayout>
  );
}