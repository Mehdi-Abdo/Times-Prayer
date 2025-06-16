import React, { useState } from 'react';
import { User, Settings, LogOut, Edit3, Save, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const UserProfile = () => {
  const { user, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
    });
  };

  const handleSave = () => {
    updateProfile(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
    });
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  if (!user) return null;

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-islamic-200 dark:border-gray-600 rounded-xl px-4 py-2 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
        <div className="p-1 bg-islamic-100 dark:bg-islamic-800 rounded-full transition-colors duration-300">
          <User className="h-4 w-4 text-islamic-600 dark:text-islamic-400" />
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
          {user.firstName} {user.lastName}
        </span>
      </button>

      {/* Dropdown Menu */}
      <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform scale-95 group-hover:scale-100">
        <div className="p-6">
          {/* Profile Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-islamic-100 dark:bg-islamic-800 rounded-full transition-colors duration-300">
                <User className="h-6 w-6 text-islamic-600 dark:text-islamic-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-300">Profile</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">{user.email}</p>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="p-2 text-gray-400 dark:text-gray-500 hover:text-islamic-600 dark:hover:text-islamic-400 transition-all duration-300 transform hover:scale-110"
              >
                <Edit3 className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Profile Form */}
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                  First Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={editData.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-islamic-500 focus:border-islamic-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-all duration-300"
                  />
                ) : (
                  <p className="text-sm text-gray-800 dark:text-gray-200 py-2 transition-colors duration-300">{user.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                  Last Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={editData.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-islamic-500 focus:border-islamic-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-all duration-300"
                  />
                ) : (
                  <p className="text-sm text-gray-800 dark:text-gray-200 py-2 transition-colors duration-300">{user.lastName}</p>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="flex space-x-2 animate-fade-in">
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-1 px-3 py-2 bg-islamic-500 dark:bg-islamic-600 text-white rounded-lg text-sm hover:bg-islamic-600 dark:hover:bg-islamic-700 transition-all duration-300 transform hover:scale-105"
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-1 px-3 py-2 bg-gray-500 dark:bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-600 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>

          {/* Account Info */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4 transition-colors duration-300">
            <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300 transform hover:scale-105"
          >
            <LogOut className="h-4 w-4" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};