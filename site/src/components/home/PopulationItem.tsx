interface PopulationItemProps {
  icon: string;
  description: string;
}

export default function PopulationItem({ icon, description }: PopulationItemProps) {
  return (
    <div className="population-item">
      <div className="population-marker">
        <i data-lucide={icon}></i>
      </div>
      <p>{description}</p>
    </div>
  );
}
