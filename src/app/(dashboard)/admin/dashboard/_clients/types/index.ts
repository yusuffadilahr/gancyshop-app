import { LucideIcon } from "lucide-react";

export interface IMetricCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;
  isPositive?: boolean;
}
