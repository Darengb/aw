interface ValuePropProps {
  icon: string;
  title: string;
  description: string;
}

export default function ValueProp({ icon, title, description }: ValuePropProps) {
  return (
    <div className="value-prop">
      <div className="value-prop-icon">
        <i data-lucide={icon}></i>
      </div>
      <div className="value-prop-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
