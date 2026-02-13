import { iconMap } from '@/lib/icons'

interface RoleItemProps {
  icon: string;
  label: string;
}

export default function RoleItem({ icon, label }: RoleItemProps) {
  const Icon = iconMap[icon];
  return (
    <div className="role-item flex items-center gap-4 bg-white p-6 rounded border border-gray-200">
      {Icon && <Icon className="role-icon text-aw-blue w-6 h-6" />}
      <span className="text-gray-900 font-medium">{label}</span>
    </div>
  );
}
