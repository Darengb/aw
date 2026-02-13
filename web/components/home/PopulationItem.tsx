import { iconMap } from '@/lib/icons';

interface PopulationItemProps {
  icon: string;
  description: string;
}

export default function PopulationItem({ icon, description }: PopulationItemProps) {
  const IconComponent = iconMap[icon];

  return (
    <div className="population-item">
      <div className="population-marker">
        {IconComponent && <IconComponent />}
      </div>
      <p>{description}</p>
    </div>
  );
}
