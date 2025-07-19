export interface Template {
  id: string;
  name: string;
  description: string;
  preview?: string;
  features: string[];
  category: string;
  color: string;
  theme: 'galaxy' | 'greek';
  icon?: string;
  available: boolean;
}