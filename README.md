# Aurum Restaurant — Premium Food Delivery

Премиальный веб-сайт ресторана с онлайн-заказом блюд. Тёмная тема, glassmorphism, Framer Motion анимации.

## Стек

**Frontend:** Next.js 15, TypeScript, Tailwind CSS, Framer Motion, React Query, Zustand, React Hook Form, shadcn/ui, Lucide Icons

**Backend:** Node.js, Express, PostgreSQL, Prisma ORM, JWT

## Быстрый старт

### 1. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

По умолчанию используется **SQLite** (`prisma/dev.db`) — Docker и PostgreSQL не нужны.

Для PostgreSQL: установите Docker, запустите `docker compose up -d` и смените `DATABASE_URL` в `.env` на PostgreSQL-строку из `.env.example`.

API: http://localhost:4000

### 3. Frontend (отдельный терминал)

```bash
cd /Users/sultan/develop/restaurant-app/frontend
npm run dev
```

Сайт: http://localhost:3000

## Демо-аккаунт

- Email: `demo@aurum.ru`
- Пароль: `password123`

## Функциональность

- **Главная** — Hero, анимированная статистика, популярные блюда, акции, отзывы, FAQ
- **Меню** — 6 категорий, поиск, фильтры по цене и категории, сортировка
- **Корзина** — slide-out панель, изменение количества, анимации
- **Оформление заказа** — форма доставки, выбор оплаты
- **Личный кабинет** — профиль, история заказов, избранное
- **Контакты** — карта, FAQ

## API Endpoints

| Method | Endpoint | Описание |
|--------|----------|----------|
| GET | `/api/dishes` | Список блюд с фильтрами |
| GET | `/api/dishes/categories` | Категории |
| POST | `/api/orders` | Создать заказ |
| GET | `/api/orders/my` | Мои заказы (JWT) |
| POST | `/api/auth/login` | Авторизация |
| POST | `/api/auth/register` | Регистрация |
| GET | `/api/favorites` | Избранное (JWT) |
| GET | `/api/reviews` | Отзывы |
| GET | `/api/promos` | Акции |
| GET | `/api/faq` | FAQ |
| GET | `/api/stats` | Статистика |

## Структура проекта

```
restaurant-app/
├── backend/          # Express API + Prisma
├── frontend/         # Next.js приложение
├── docker-compose.yml
└── README.md
```

Фронтенд работает с mock-данными, если backend недоступен.
# restaurant-app
