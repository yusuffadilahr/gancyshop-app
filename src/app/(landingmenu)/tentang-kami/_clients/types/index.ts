export interface IStatisticProps {
  icon: React.ElementType;
  value: string;
  label: string;
  description: string;
}

export interface IValueCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
}

export interface ITimelineItemProps {
  year: string;
  title: string;
  description: string;
  milestone: string;
}
