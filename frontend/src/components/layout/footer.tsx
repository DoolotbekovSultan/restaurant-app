import Link from 'next/link';
import { Flame, MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-black/40">
      <div className="absolute inset-0 bg-gradient-to-t from-gold/5 to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-amber">
                <Flame className="h-5 w-5 text-black" />
              </div>
              <span className="text-xl font-bold">
                Aurum<span className="text-gold">.</span>
              </span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              Премиальный ресторан с доставкой. Изысканные блюда от лучших шеф-поваров прямо к вашему столу.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Навигация</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/menu', label: 'Меню' },
                { href: '/account', label: 'Личный кабинет' },
                { href: '/contacts', label: 'Контакты' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm text-white/50">
                <MapPin className="h-4 w-4 text-gold shrink-0" />
                Москва, ул. Тверская, 12
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/50">
                <Phone className="h-4 w-4 text-gold shrink-0" />
                +7 (495) 123-45-67
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/50">
                <Mail className="h-4 w-4 text-gold shrink-0" />
                hello@aurum.ru
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/50">
                <Clock className="h-4 w-4 text-gold shrink-0" />
                Ежедневно 10:00 — 23:00
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Подписка</h4>
            <p className="text-sm text-white/50 mb-4">
              Получайте эксклюзивные предложения и скидки
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-gold/50 focus:outline-none"
              />
              <button className="rounded-xl bg-gradient-to-r from-gold to-amber px-4 py-2.5 text-sm font-semibold text-black hover:shadow-lg hover:shadow-gold/20 transition-all">
                OK
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/30">© 2026 Aurum Restaurant. Все права защищены.</p>
          <div className="flex gap-6 text-xs text-white/30">
            <span>Политика конфиденциальности</span>
            <span>Условия использования</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
