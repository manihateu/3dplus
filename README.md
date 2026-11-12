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

## Деплой на сервер (Docker)

В проекте есть `Dockerfile` (multi-stage, Next.js `output: "standalone"`), `docker-compose.yml` и workflow `.github/workflows/docker.yml`.

### Вариант 1 — готовый образ из GHCR (рекомендуется для слабого VPS)

Каждый пуш в `main` собирает образ на раннере GitHub Actions и публикует его в `ghcr.io/manihateu/3dplus:latest`. Сервер только скачивает готовый образ, сборка на нём не запускается.

Если пакет в GHCR приватный (по умолчанию), один раз авторизуйтесь на сервере:

```bash
# PAT с правом read:packages
echo "<токен>" | docker login ghcr.io -u manihateu --password-stdin
```

Либо сделайте пакет публичным: GitHub → Packages → `3dplus` → Package settings → Change visibility → Public.

Запуск и обновление:

```bash
git clone https://github.com/manihateu/3dplus.git && cd 3dplus
docker compose pull
docker compose up -d
```

```bash
git pull
docker compose pull
docker compose up -d
```

То есть после пуша в `main` дождитесь зелёного workflow и выполните три команды выше — пересборки на сервере не будет.

### Вариант 2 — сборка на сервере

```bash
docker compose up -d --build
```

Первый билд на VPS с 1–2 vCPU идёт десятки минут (Next.js + Turbopack + `npm ci`). Повторные быстрее за счёт BuildKit cache mounts (`/root/.npm` и `.next/cache`), но на слабом сервере всё равно медленно. Если сборка падает по памяти — добавьте swap или собирайте образ вне сервера (вариант 1).

### Общее

Сайт слушает `http://<ip-сервера>:3000`. Порт и адрес образа меняются через `.env` рядом с `docker-compose.yml`:

```bash
APP_PORT=8080
# WEB_IMAGE=ghcr.io/manihateu/3dplus:latest
```

Полезные команды:

```bash
docker compose ps                 # статус и health
docker compose logs -f web        # логи приложения
curl localhost:3000/api/health    # проверка живости
docker compose down               # остановить (кэш сохраняется в volume)
docker compose down -v            # остановить и удалить кэш
```

Домен и HTTPS терминируются внешним прокси (nginx, Caddy, Traefik) или балансировщиком. Пример location для nginx:

```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

Особенности:

- образ собирается под `linux/amd64`; для ARM-сервера поменяйте `platforms` в `.github/workflows/docker.yml`.
- кэш Next.js (`.next/cache`) вынесен в volume `next-cache` и переживает перезапуск контейнера.
- контейнер работает от непривилегированного пользователя `nextjs`.

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
    api/health/         # healthcheck для Docker
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
