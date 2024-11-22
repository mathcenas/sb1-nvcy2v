export interface Service {
  id: string;
  name: string;
  url: string;
  description: string;
  status: 'production' | 'staging' | 'development';
  lastCheck: Date;
  isActive: boolean;
  ip: string;
  cloudProvider: string;
  monthlyCost: number;
  supportedBy: string;
}