import { PrismaClient, Category } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const dishes = [
  // Pizza
  {
    name: 'Трюфельная Маргарита',
    description: 'Тонкое тесто, соус из томатов Сан-Марцано, моцарелла ди буфала, чёрный трюфель и свежий базилик',
    price: 1290,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80',
    category: Category.PIZZA,
    rating: 4.9,
    popularity: 2840,
    isPopular: true,
  },
  {
    name: 'Пепперони Премиум',
    description: 'Пикантная салями, моцарелла, орегано и фирменный томатный соус на ржаной основе',
    price: 890,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80',
    category: Category.PIZZA,
    rating: 4.7,
    popularity: 3200,
    isPopular: true,
    isPromo: true,
    promoPrice: 690,
  },
  {
    name: 'Кватро Формаджи',
    description: 'Моцарелла, горгонзола, пармезан и грюйер на хрустящей основе',
    price: 990,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
    category: Category.PIZZA,
    rating: 4.8,
    popularity: 1950,
  },
  // Burgers
  {
    name: 'Wagyu Smash Burger',
    description: 'Двойная котлета из мраморной говядины Wagyu, карамелизированный лук, трюфельный айоли',
    price: 1490,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
    category: Category.BURGERS,
    rating: 4.9,
    popularity: 4100,
    isPopular: true,
  },
  {
    name: 'Классический Чизбургер',
    description: 'Говяжья котлета 200г, чеддер, маринованные огурцы, фирменный соус на бриоши',
    price: 690,
    image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=800&q=80',
    category: Category.BURGERS,
    rating: 4.6,
    popularity: 2800,
  },
  {
    name: 'Криспи Чикен',
    description: 'Хрустящая куриная грудка в панировке, коул-слоу, сыр чеддер, острый соус',
    price: 590,
    image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800&q=80',
    category: Category.BURGERS,
    rating: 4.5,
    popularity: 1650,
    isPromo: true,
    promoPrice: 490,
  },
  // Sushi
  {
    name: 'Сет «Император»',
    description: '24 шт: филадельфия, дракон, унаги, тунец, лосось. Идеально для двоих',
    price: 2890,
    image: 'https://images.unsplash.com/photo-1579584425558-c3ce17fd4351?w=800&q=80',
    category: Category.SUSHI,
    rating: 4.9,
    popularity: 2200,
    isPopular: true,
  },
  {
    name: 'Филадельфия Классик',
    description: 'Лосось, сливочный сыр, огурец, 8 штук. Нежный и сбалансированный вкус',
    price: 690,
    image: 'https://images.unsplash.com/photo-1617196034183-42106e7b0bde?w=800&q=80',
    category: Category.SUSHI,
    rating: 4.8,
    popularity: 3500,
    isPopular: true,
  },
  {
    name: 'Спайси Тунец',
    description: 'Тунец, острый соус спайси, зелёный лук, кунжут, 8 штук',
    price: 790,
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80',
    category: Category.SUSHI,
    rating: 4.7,
    popularity: 1800,
  },
  // Drinks
  {
    name: 'Домашний Лимонад',
    description: 'Свежевыжатый лимон, мята, имбирь, тростниковый сахар, 500 мл',
    price: 290,
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800&q=80',
    category: Category.DRINKS,
    rating: 4.6,
    popularity: 1200,
  },
  {
    name: 'Матча Латте',
    description: 'Японский матча премиум-класса, овсяное молоко, мед, 400 мл',
    price: 390,
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c046c28f?w=800&q=80',
    category: Category.DRINKS,
    rating: 4.8,
    popularity: 980,
    isPopular: true,
  },
  {
    name: 'Свежевыжатый Апельсин',
    description: '100% натуральный сок из отборных апельсинов, 400 мл',
    price: 350,
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=800&q=80',
    category: Category.DRINKS,
    rating: 4.5,
    popularity: 750,
  },
  // Desserts
  {
    name: 'Тирамису Авторский',
    description: 'Классический итальянский десерт с маскарпоне, савоярди и эспрессо',
    price: 490,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80',
    category: Category.DESSERTS,
    rating: 4.9,
    popularity: 2100,
    isPopular: true,
  },
  {
    name: 'Шоколадный Фондан',
    description: 'Тёплый шоколадный кекс с жидкой начинкой, ванильное мороженое',
    price: 450,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&q=80',
    category: Category.DESSERTS,
    rating: 4.8,
    popularity: 1650,
    isPromo: true,
    promoPrice: 390,
  },
  {
    name: 'Чизкейк Нью-Йорк',
    description: 'Классический чизкейк на песочной основе с ягодным соусом',
    price: 420,
    image: 'https://images.unsplash.com/photo-1533134242443-19f307342814?w=800&q=80',
    category: Category.DESSERTS,
    rating: 4.7,
    popularity: 1400,
  },
  // National
  {
    name: 'Плов Узбекский',
    description: 'Баранина, рис девзира, морковь, зира и барбарис по традиционному рецепту',
    price: 790,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80',
    category: Category.NATIONAL,
    rating: 4.8,
    popularity: 1900,
    isPopular: true,
  },
  {
    name: 'Хачапури по-аджарски',
    description: 'Лодочка из дрожжевого теста с сулугуни, яйцом и сливочным маслом',
    price: 590,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80',
    category: Category.NATIONAL,
    rating: 4.7,
    popularity: 2200,
    isPopular: true,
  },
  {
    name: 'Борщ с говядиной',
    description: 'Наваристый борщ со сметаной, пампушками и нежной говядиной',
    price: 490,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80',
    category: Category.NATIONAL,
    rating: 4.6,
    popularity: 1100,
  },
];

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.review.deleteMany();
  await prisma.dish.deleteMany();
  await prisma.promo.deleteMany();
  await prisma.faq.deleteMany();
  await prisma.user.deleteMany();

  const password = await bcrypt.hash('password123', 12);
  const demoUser = await prisma.user.create({
    data: {
      email: 'demo@aurum.ru',
      password,
      name: 'Александр Иванов',
      phone: '+7 (999) 123-45-67',
      address: 'ул. Тверская, 12, кв. 45, Москва',
    },
  });

  await prisma.dish.createMany({ data: dishes });

  const allDishes = await prisma.dish.findMany();
  await prisma.favorite.createMany({
    data: [
      { userId: demoUser.id, dishId: allDishes[0].id },
      { userId: demoUser.id, dishId: allDishes[3].id },
      { userId: demoUser.id, dishId: allDishes[6].id },
    ],
  });

  await prisma.review.createMany({
    data: [
      {
        author: 'Мария К.',
        rating: 5,
        text: 'Невероятный вкус! Wagyu бургер — лучший в городе. Доставили за 30 минут, всё горячее.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      },
      {
        author: 'Дмитрий С.',
        rating: 5,
        text: 'Сет «Император» — это произведение искусства. Свежайшая рыба, идеальный рис.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      },
      {
        author: 'Елена В.',
        rating: 5,
        text: 'Трюфельная пицца — мой фаворит. Интерьер ресторана отражается в качестве блюд.',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      },
      {
        author: 'Артём П.',
        rating: 4,
        text: 'Отличный сервис и быстрая доставка. Хачапури по-аджарски — как в Тбилиси!',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      },
    ],
  });

  await prisma.promo.createMany({
    data: [
      {
        title: 'Скидка 20% на первый заказ',
        description: 'Используйте промокод AURUM20 при оформлении',
        discount: 20,
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
        validUntil: new Date('2026-12-31'),
      },
      {
        title: 'Бесплатная доставка',
        description: 'При заказе от 1500 ₽ доставка бесплатно',
        discount: 0,
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
        validUntil: new Date('2026-12-31'),
      },
    ],
  });

  await prisma.faq.createMany({
    data: [
      {
        question: 'Какое время доставки?',
        answer: 'Среднее время доставки — 35-45 минут в зависимости от загруженности и расстояния.',
        order: 1,
      },
      {
        question: 'Минимальная сумма заказа?',
        answer: 'Минимальная сумма заказа — 500 ₽. При заказе от 1500 ₽ доставка бесплатная.',
        order: 2,
      },
      {
        question: 'Какие способы оплаты доступны?',
        answer: 'Мы принимаем оплату картой онлайн, картой курьеру и наличными при получении.',
        order: 3,
      },
      {
        question: 'Можно ли отменить заказ?',
        answer: 'Заказ можно отменить бесплатно в течение 5 минут после оформления через личный кабинет.',
        order: 4,
      },
      {
        question: 'Есть ли аллергены в блюдах?',
        answer: 'Информация об аллергенах указана в описании каждого блюда. Свяжитесь с нами для уточнений.',
        order: 5,
      },
    ],
  });

  console.log('✅ Seed completed');
  console.log('📧 Demo user: demo@aurum.ru / password123');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
