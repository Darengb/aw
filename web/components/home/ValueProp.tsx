import { iconMap } from '@/lib/icons';

interface ValuePropProps {
  icon: string;
  title: string;
  description: string;
}

export default function ValueProp({ icon, title, description }: ValuePropProps) {
  const IconComponent = iconMap[icon];

  return (
    <div className="value-prop">
      <div className="value-prop-icon">
        {IconComponent && <IconComponent />}
      </div>
      <div className="value-prop-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
