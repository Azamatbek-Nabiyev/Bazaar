export const SidebarNavItem = ({ icon, label, active, danger, onClick }: {
  icon: any, label: string, active?: boolean, danger?: boolean, onClick: () => void 
}) => {
  const base = 'flex items-center gap-3 px-4 py-3 text-sm w-full text-left';
  const activeStyle = active
    ? 'bg-white border-l-2 border-black font-medium'
    : 'text-gray-500 hover:bg-gray-100';
  const dangerStyle = danger ? 'text-orange-600' : '';

  return (
    <button onClick={onClick} className={`${base} ${danger ? dangerStyle : activeStyle}`}>
      {icon}
      {label}
    </button>
  );
};