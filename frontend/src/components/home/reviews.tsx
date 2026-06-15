'use client';

import { useQuery } from '@tanstack/react-query';
import { Star, Quote } from 'lucide-react';
import { api } from '@/lib/api';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollReveal } from '@/components/shared/scroll-reveal';

export function Reviews() {
  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews'],
    queryFn: api.reviews.getAll,
  });

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-sm font-medium text-gold uppercase tracking-wider mb-2 text-center">Отзывы</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
            Что говорят наши гости
          </h2>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 3).map((review, i) => (
            <ScrollReveal key={review.id} delay={i * 0.1}>
              <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-500 hover:border-gold/20 hover:bg-white/8">
                <Quote className="absolute top-4 right-4 h-8 w-8 text-gold/20" />
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    {review.avatar && <AvatarImage src={review.avatar} alt={review.author} />}
                    <AvatarFallback>{review.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-white">{review.author}</p>
                    <div className="flex gap-0.5 mt-0.5">
                      {Array.from({ length: review.rating }).map((_, j) => (
                        <Star key={j} className="h-3.5 w-3.5 fill-gold text-gold" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">{review.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
