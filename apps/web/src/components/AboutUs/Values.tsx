import { Sparkles, Leaf, Heart } from 'lucide-react';
import { values } from './mockData';

const icons = [Sparkles, Leaf, Heart];

export default function Values() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="mb-12 text-center max-w-xl mx-auto">
        <p className="text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-3">
          What We Stand For
        </p>
        <h2 className="text-3xl font-bold text-neutral-900">Our Values</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {values.map((value, index) => {
          const Icon = icons[index] ?? Sparkles;
          return (
            <div key={value.title} className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center">
                <Icon size={20} className="text-neutral-900" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                {value.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}