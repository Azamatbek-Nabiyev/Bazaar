export const StatCard = ({ icon, value, label }: {
  icon: any, value: number | string, label: string
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="text-gray-400 mb-3">{icon}</div>
      <div className="text-2xl font-serif font-bold">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
};