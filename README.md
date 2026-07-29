# Guessing Ball / Шар предсказаний

Простой сайт-магический шар (Magic 8 Ball). Нажмите на шар — он потрясётся и покажет один из восьми ответов на русском или английском языке (переключатель RU/EN в правом верхнем углу).

Ответы:

- Да / Yes
- Нет / No
- Возможно / Maybe
- Двигайся в том же направлении / Keep going the same way
- Не могу сказать точно / Cannot predict now
- Скорее всего нет / Most likely not
- Скорее всего да / Most likely yes
- Тебе нужно рассмотреть другие варианты / You should consider other options

## Стек

Next.js (App Router) + TypeScript + CSS Modules, статический экспорт (`output: "export"`) для публикации на GitHub Pages.

## Разработка

```bash
npm install
npm run dev
```

Открыть [http://localhost:3000](http://localhost:3000).

## Сборка статики

```bash
npm run build
```

Результат — в папке `out/`.

## Деплой

При пуше в ветку `main` workflow `.github/workflows/deploy.yml` собирает сайт и публикует его на GitHub Pages. В настройках репозитория (Settings → Pages) источник должен быть выставлен как **GitHub Actions**.
