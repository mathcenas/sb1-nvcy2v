import React, { useState } from 'react';
import { ExternalLink, Check, X, ChevronDown, ChevronUp, Cloud, DollarSign, Network, Users } from 'lucide-react';
import type { Service } from '../types';
import { timeAgo } from '../utils/timeAgo';

interface ServiceCardProps {
  service: Service;
  onCheck: (id: string) => void;
  darkMode: boolean;
}

export function ServiceCard({ service, onCheck, darkMode }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`${
        darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
      } rounded-lg shadow-sm transition-all duration-200`}
    >
      <div 
        className="p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-2 h-2 rounded-full ${
              service.isActive 
                ? 'bg-green-500 dark:bg-green-400' 
                : 'bg-red-500 dark:bg-red-400'
            }`} />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className={`font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {service.name}
                </h3>
                {isExpanded ? (
                  <ChevronUp className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                ) : (
                  <ChevronDown className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                )}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <a 
                  href={service.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 truncate flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  {service.url}
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {timeAgo(new Date(service.lastCheck))}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCheck(service.id);
              }}
              className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm transition-colors ${
                service.isActive
                  ? 'bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50'
                  : 'bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50'
              }`}
            >
              {service.isActive ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
              {service.isActive ? 'Healthy' : 'Failed'}
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className={`mt-4 pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'} grid grid-cols-2 gap-4`}>
            <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <Network className="w-4 h-4" />
              <span className="font-medium">IP:</span>
              {service.ip}
            </div>
            <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <Cloud className="w-4 h-4" />
              <span className="font-medium">Provider:</span>
              {service.cloudProvider}
            </div>
            <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <DollarSign className="w-4 h-4" />
              <span className="font-medium">Cost:</span>
              ${service.monthlyCost}/month
            </div>
            <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <Users className="w-4 h-4" />
              <span className="font-medium">Support:</span>
              {service.supportedBy}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}