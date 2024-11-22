import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Service } from '../types';

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (service: Omit<Service, 'id' | 'lastCheck' | 'isActive'>) => void;
  darkMode: boolean;
}

const CLOUD_PROVIDERS = [
  'AWS',
  'Google Cloud',
  'Azure',
  'DigitalOcean',
  'Heroku',
  'Other'
];

export function AddServiceModal({ isOpen, onClose, onAdd, darkMode }: AddServiceModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    status: 'production',
    ip: '',
    cloudProvider: 'AWS',
    monthlyCost: 0,
    supportedBy: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ 
      name: '', 
      url: '', 
      description: '', 
      status: 'production',
      ip: '',
      cloudProvider: 'AWS',
      monthlyCost: 0,
      supportedBy: ''
    });
    onClose();
  };

  const inputClasses = `w-full px-3 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 ${
    darkMode 
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
      : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
  }`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg w-full max-w-md`}>
        <div className={`flex items-center justify-between p-4 ${darkMode ? 'border-b border-gray-700' : 'border-b'}`}>
          <h2 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Add Service</h2>
          <button onClick={onClose} className={darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputClasses}
              placeholder="e.g., API Service"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              URL
            </label>
            <input
              type="url"
              required
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className={inputClasses}
              placeholder="e.g., https://api.example.com"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              IP Address
            </label>
            <input
              type="text"
              required
              value={formData.ip}
              onChange={(e) => setFormData({ ...formData, ip: e.target.value })}
              className={inputClasses}
              placeholder="e.g., 192.168.1.1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Cloud Provider
              </label>
              <select
                value={formData.cloudProvider}
                onChange={(e) => setFormData({ ...formData, cloudProvider: e.target.value })}
                className={inputClasses}
              >
                {CLOUD_PROVIDERS.map(provider => (
                  <option key={provider} value={provider}>{provider}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Monthly Cost ($)
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.monthlyCost}
                onChange={(e) => setFormData({ ...formData, monthlyCost: parseFloat(e.target.value) })}
                className={inputClasses}
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Supported By
            </label>
            <input
              type="text"
              required
              value={formData.supportedBy}
              onChange={(e) => setFormData({ ...formData, supportedBy: e.target.value })}
              className={inputClasses}
              placeholder="e.g., DevOps Team"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={inputClasses}
              placeholder="Brief description"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className={inputClasses}
            >
              <option value="production">Production</option>
              <option value="staging">Staging</option>
              <option value="development">Development</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-md ${
                darkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Add Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}