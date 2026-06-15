'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Percent } from 'lucide-react';
import { api } from '@/lib/api';
import { ScrollReveal } from '@/components/shared/scroll-reveal';

export function Promos() {
  const { data: promos = [] } = useQuery({
    queryKey: ['promos'],
    queryFn: api.promos.getAll,
  });

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-sm font-medium text-gold uppercase tracking-wider mb-2">Специальные предложения</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">Акции и скидки</h2>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2">
          {promos.map((promo, i) => (
            <ScrollReveal key={promo.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 h-64"
              >
                <Image
                  src={promo.image}
                  alt={promo.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-center">
                  {promo.discount > 0 && (
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 border border-gold/30 px-3 py-1 text-sm text-gold w-fit mb-3">
                      <Percent className="h-3.5 w-3.5" />
                      -{promo.discount}%
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-white">{promo.title}</h3>
                  <p className="mt-2 text-white/60 text-sm max-w-sm">{promo.description}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
