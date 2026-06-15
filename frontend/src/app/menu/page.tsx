import { Suspense } from 'react';
import MenuPage from './menu-content';

export default function Page() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-7xl px-4 pt-28 pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-80 rounded-2xl bg-white/5 animate-pulse" />
          ))}
        </div>
      </div>
    }>
      <MenuPage />
    </Suspense>
  );
}
