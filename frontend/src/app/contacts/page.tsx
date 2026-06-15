'use client';

import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { PageTransition } from '@/components/shared/page-transition';
import { FAQ } from '@/components/home/faq';

export default function ContactsPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <ScrollReveal>
          <p className="text-sm font-medium text-gold uppercase tracking-wider mb-2">Контакты</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-12">Как нас найти</h1>
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-2 mb-20">
          <ScrollReveal>
            <div className="space-y-6">
              {[
                { icon: MapPin, label: 'Адрес', value: 'Москва, ул. Тверская, 12' },
                { icon: Phone, label: 'Телефон', value: '+7 (495) 123-45-67' },
                { icon: Mail, label: 'Email', value: 'hello@aurum.ru' },
                { icon: Clock, label: 'Часы работы', value: 'Ежедневно 10:00 — 23:00' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all hover:border-gold/20"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10">
                    <item.icon className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50">{item.label}</p>
                    <p className="text-lg font-medium text-white mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}

              <a
                href="https://yandex.ru/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold to-amber px-6 py-3 text-sm font-semibold text-black hover:shadow-lg hover:shadow-gold/20 transition-all"
              >
                <Navigation className="h-4 w-4" />
                Построить маршрут
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 h-[400px] lg:h-full min-h-[400px]">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=37.605%2C55.755%2C37.615%2C55.765&layer=mapnik&marker=55.76%2C37.61"
                className="absolute inset-0 w-full h-full border-0 grayscale opacity-80"
                title="Карта ресторана Aurum"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/60 to-transparent pointer-events-none" />
            </div>
          </ScrollReveal>
        </div>

        <FAQ />
      </div>
    </PageTransition>
  );
}
