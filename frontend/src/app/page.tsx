import { Hero } from '@/components/home/hero';
import { Stats } from '@/components/home/stats';
import { PopularDishes } from '@/components/home/popular-dishes';
import { Promos } from '@/components/home/promos';
import { Reviews } from '@/components/home/reviews';
import { FAQ } from '@/components/home/faq';
import { PageTransition } from '@/components/shared/page-transition';

export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <Stats />
      <PopularDishes />
      <Promos />
      <Reviews />
      <FAQ />
    </PageTransition>
  );
}
