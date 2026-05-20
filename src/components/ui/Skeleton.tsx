'use client';

export function SkeletonCard() {
  return (
    <div className="card-premium p-6 animate-pulse">
      <div className="h-48 bg-gray-200 rounded-2xl mb-4" />
      <div className="h-5 bg-gray-200 rounded-lg w-3/4 mb-3" />
      <div className="h-4 bg-gray-100 rounded-lg w-full mb-2" />
      <div className="h-4 bg-gray-100 rounded-lg w-5/6" />
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="gradient-hero py-28 lg:py-32 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <div className="w-48 h-8 bg-white/10 rounded-full mx-auto mb-8" />
        <div className="w-80 h-14 bg-white/10 rounded-2xl mx-auto mb-5" />
        <div className="w-96 h-6 bg-white/5 rounded-xl mx-auto" />
      </div>
    </div>
  );
}

export function SkeletonLine({ width = 'w-full' }: { width?: string }) {
  return <div className={`h-4 bg-gray-200 rounded-lg ${width} animate-pulse`} />;
}

export function SkeletonDashboard() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-40 bg-gray-800/50 rounded-3xl" />
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-800/30 rounded-2xl" />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 h-64 bg-gray-800/30 rounded-2xl" />
        <div className="h-64 bg-gray-800/30 rounded-2xl" />
      </div>
    </div>
  );
}
