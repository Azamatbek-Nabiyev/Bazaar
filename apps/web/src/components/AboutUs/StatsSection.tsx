import { stats } from './mockData';

export default function StatsSection() {
  return (
    <section className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-neutral-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}