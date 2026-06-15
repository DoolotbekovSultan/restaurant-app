'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
          alt="Премиальная кухня Aurum"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-black/50" />
      </div>

      <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-gold/10 blur-[120px]" />
      <div className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-orange-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm text-gold backdrop-blur-sm mb-6"
          >
            <Sparkles className="h-4 w-4" />
            Премиальная доставка еды
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
          >
            <span className="text-white">Вкус</span>
            <br />
            <span className="bg-gradient-to-r from-gold via-amber to-orange bg-clip-text text-transparent">
              совершенства
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg text-white/60 leading-relaxed max-w-lg"
          >
            Изысканные блюда от шеф-поваров мирового уровня. Доставка за 35 минут с сохранением
            каждой ноты вкуса.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button size="lg" asChild>
              <Link href="/menu">
                Заказать сейчас
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/menu?popular=true">Популярные блюда</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
