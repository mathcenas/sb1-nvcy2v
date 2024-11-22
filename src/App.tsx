import React, { useState, useEffect } from 'react';
import { Plus, RefreshCw, Moon, Sun } from 'lucide-react';
import { ServiceCard } from './components/ServiceCard';
import { AddServiceModal } from './components/AddServiceModal';
import type { Service } from './types';

const EXAMPLE_SERVICES: Omit<Service, 'id' | 'lastCheck' | 'isActive'>[] = [
  {
    name: "API Gateway",
    url: "https://api.example.com",
    description: "Main API service",
    status: "production",
    ip: "10.0.1.100",
    cloudProvider: "AWS",
    monthlyCost: 150,
    supportedBy: "Platform Team"
  },
  {
    name: "Auth Service",
    url: "https://auth.example.com",
    description: "Authentication service",
    status: "staging",
    ip: "10.0.1.101",
    cloudProvider: "Google Cloud",
    monthlyCost: 75,
    supportedBy: "Security Team"
  },
  {
    name: "CDN",
    url: "https://cdn.example.com",
    description: "Content delivery",
    status: "production",
    ip: "10.0.1.102",
    cloudProvider: "Cloudflare",
    monthlyCost: 25,
    supportedBy: "Infrastructure Team"
  }
];

export function App() {
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('services');
    return saved ? JSON.parse(saved) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    if (services.length === 0) {
      EXAMPLE_SERVICES.forEach(service => {
        addService(service);
      });
    }
  }, []);

  const addService = (newService: Omit<Service, 'id' | 'lastCheck' | 'isActive'>) => {
    const service: Service = {
      ...newService,
      id: crypto.randomUUID(),
      lastCheck: new Date(),
      isActive: false,
    };
    setServices(prev => [...prev, service]);
    checkService(service.id);
  };

  const checkService = async (id: string) => {
    const service = services.find(s => s.id === id);
    if (!service) return;

    try {
      const response = await fetch(service.url, { mode: 'no-cors' });
      const isActive = response.type === 'opaque' || response.ok;
      
      setServices(services.map(s => 
        s.id === id ? { ...s, isActive, lastCheck: new Date() } : s
      ));
    } catch (error) {
      setServices(services.map(s => 
        s.id === id ? { ...s, isActive: false, lastCheck: new Date() } : s
      ));
    }
  };

  const checkAllServices = () => {
    services.forEach(service => checkService(service.id));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-medium text-gray-900 dark:text-white">Services</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={checkAllServices}
              className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {services.map(service => (
            <ServiceCard
              key={service.id}
              service={service}
              onCheck={checkService}
              darkMode={darkMode}
            />
          ))}
          {services.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No services added yet</p>
            </div>
          )}
        </div>

        <AddServiceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={addService}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
}