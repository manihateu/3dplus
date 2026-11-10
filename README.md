# Стоматология 3D plus — новый сайт

Современная версия сайта стоматологической клиники «3D plus» (Ульяновск), перенесённая с [3dplus73.ru](https://3dplus73.ru/) на новый стек.

## Стек

- **Next.js 16** (App Router, Turbopack, Cache Components)
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — анимации появления, меню, формы
- **Lucide React** — иконки
- **next/font** — Manrope + Unbounded (кириллица)

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production-сборка
npm run start    # запуск сборки
npm run lint     # ESLint
```

## Структура

```
src/
  app/
    page.tsx            # главная
    about/              # о клинике, команда, документы
    services/           # услуги с якорями
    price/              # прайс-лист (поиск + категории)
    reviews/            # отзывы и площадки
    contacts/           # контакты, карта, запись
    privacy/            # политика обработки данных
    api/booking/        # приём заявок с формы
    sitemap.ts, robots.ts, icon.png
  components/
    site-header.tsx, site-footer.tsx, mobile-cta.tsx
    booking-form.tsx, booking-section.tsx
    price-explorer.tsx, contacts-section.tsx
    home/*              # секции главной
  lib/
    site.ts             # контакты, услуги, врачи, отзывы, документы
    prices.ts           # полный прайс (150 услуг, 5 категорий)
```

## Контент и данные

- Тексты, контакты, врачи, отзывы и документы перенесены с действующего сайта.
- Полный прайс-лист распарсен с оригинальной страницы `/price` и хранится в `src/lib/prices.ts`.
- Фотографии и PDF-документы лежат в `public/images` и `public/docs`.
- Цены и акции не являются публичной офертой.

## Форма записи

Форма отправляется на `POST /api/booking` (`src/app/api/booking/route.ts`). Сейчас маршрут валидирует данные и пишет заявку в лог сервера. Для запуска в продакшене нужно подключить CRM (например, YCLIENTS) или отправку на почту клиники — место отмечено `TODO` в обработчике.

## Что стоит проверить перед публикацией

- Подключить реальную доставку заявок (CRM/почта/Telegram).
- Проверить актуальность цен, графика работы и состава врачей.
- При необходимости добавить счётчики аналитики и обновить `metadataBase`, если домен изменится.
