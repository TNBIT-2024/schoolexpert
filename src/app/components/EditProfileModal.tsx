import React, { useState, useEffect } from 'react';
import { 
  User as UserIcon, 
  Phone, 
  MapPin, 
  X, 
  Loader2, 
  Save, 
  ShieldCheck, 
  Building, 
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { toast } from 'sonner';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const { currentUser } = useAuth();

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Form Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!isOpen || !currentUser?.id) return;

    async function loadProfile() {
      try {
        setLoading(true);
        setError('');
        
        const { data, error: fetchErr } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', currentUser.id)
          .single();

        if (fetchErr) throw fetchErr;

        if (data) {
          setProfile(data);
          setName(data.name || '');
          setPhone(data.phone || '');
          setCity(data.city || '');
          setAvatarUrl(data.avatar_url || '');
        }
      } catch (err: any) {
        console.error('Error fetching profile in modal:', err);
        setError(err.message || 'Failed to load profile details.');
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [isOpen, currentUser]);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file.');
      return;
    }

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size must be less than 2MB.');
      return;
    }

    try {
      setUploading(true);
      setError('');

      const fileExt = file.name.split('.').pop();
      const fileName = `avatar-${Date.now()}.${fileExt}`;
      const filePath = `${currentUser.id}/${fileName}`;

      // Upload file to Supabase Storage bucket 'avatars'
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      setAvatarUrl(data.publicUrl);
      toast.success('Profile picture uploaded!');
    } catch (err: any) {
      console.error('Error uploading avatar:', err);
      toast.error(err.message || 'Failed to upload profile picture.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      return setError('Name cannot be empty.');
    }

    setError('');
    setSaving(true);

    try {
      // 1. Update Supabase Auth User Metadata (updates global AuthContext user session)
      const { error: authErr } = await supabase.auth.updateUser({
        data: {
          name: name.trim(),
          phone: phone.trim(),
          city: city.trim(),
          avatar_url: avatarUrl,
        }
      });
      if (authErr) throw authErr;

      // 2. Update profiles table in the database
      const { error: dbErr } = await supabase
        .from('profiles')
        .update({
          name: name.trim(),
          phone: phone.trim(),
          city: city.trim(),
          avatar_url: avatarUrl,
        })
        .eq('id', currentUser.id);
      if (dbErr) throw dbErr;

      toast.success('Profile updated successfully!');
      onClose();
    } catch (err: any) {
      console.error('Error updating profile in modal:', err);
      setError(err.message || 'Failed to save changes.');
      toast.error('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Banner */}
        <div className="h-24 bg-gradient-to-r from-amber-500 via-orange-400 to-amber-600 flex-shrink-0" />

        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors z-10 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="px-6 pb-6 sm:px-8 sm:pb-8 -mt-8 flex-1 overflow-y-auto">
          
          {/* Avatar & Title Row */}
          <div className="flex items-end gap-3 mb-6">
            <div className="relative group flex-shrink-0">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white text-xl font-black border-2 border-white shadow-md select-none">
                  {name ? name[0].toUpperCase() : '?'}
                </div>
              )}
              
              <label 
                htmlFor="avatar-input" 
                className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer text-white border-2 border-transparent"
              >
                {uploading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <span className="text-[10px] font-bold tracking-wider uppercase text-center px-1">Change</span>
                )}
              </label>
              <input
                id="avatar-input"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                disabled={uploading || saving}
                className="hidden"
              />
            </div>
            <div className="pb-1 min-w-0 flex-1">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 leading-tight">Edit Profile</h2>
              <div className="flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-500 capitalize mt-0.5">
                {profile?.user_type === 'parent' && <UserIcon className="w-3 h-3" />}
                {profile?.user_type === 'school' && <Building className="w-3 h-3" />}
                {profile?.user_type === 'service' && <Briefcase className="w-3 h-3" />}
                {(profile?.user_type === 'educator' || profile?.user_type === 'special_educator') && <GraduationCap className="w-3 h-3" />}
                <span>{profile?.user_type ? profile.user_type.replace('_', ' ') : 'User'} Account</span>
              </div>
            </div>
          </div>

          {/* Form */}
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-2">
              <Loader2 className="w-8 h-8 text-amber-600 animate-spin" />
              <span className="text-xs font-semibold text-slate-400">Loading details...</span>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-4">
              
              {error && (
                <div className="p-3 bg-red-50 border border-red-150 text-red-600 rounded-xl text-xs text-center font-medium">
                  {error}
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="text-xs font-bold text-slate-500 mb-1.5 block">Full Name</label>
                <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-sm focus-within:border-amber-500 transition-colors">
                  <UserIcon className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-transparent text-sm focus:outline-none text-slate-800"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="text-xs font-bold text-slate-500 mb-1.5 block">Phone Number</label>
                <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-sm focus-within:border-amber-500 transition-colors">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full bg-transparent text-sm focus:outline-none text-slate-800"
                  />
                </div>
              </div>

              {/* City */}
              <div>
                <label className="text-xs font-bold text-slate-500 mb-1.5 block">City</label>
                <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-sm focus-within:border-amber-500 transition-colors">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Mumbai"
                    className="w-full bg-transparent text-sm focus:outline-none text-slate-800"
                  />
                </div>
              </div>

              {/* Email (Disabled/Read-only) */}
              <div>
                <label className="text-xs font-bold text-slate-500 mb-1.5 block">Email Address (Cannot change)</label>
                <div className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50/80 px-3.5 py-2.5 text-slate-450">
                  <span className="text-xs font-semibold text-slate-500 truncate">{currentUser?.email}</span>
                </div>
              </div>

              {/* Service Provider Type (Only shown if user type is service) */}
              {profile?.user_type === 'service' && (
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1.5 block">Service Category</label>
                  <div className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50/80 px-3.5 py-2.5 text-slate-450">
                    <span className="text-xs font-semibold text-slate-500 truncate">{profile?.service_type || 'None'}</span>
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={saving}
                  className="rounded-xl border border-slate-200 hover:bg-slate-50 px-4 py-2 text-xs font-bold text-slate-600 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
