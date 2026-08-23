# Инструкции для агента

## Язык общения

Всегда отвечай пользователю **на русском языке**, независимо от языка его сообщения.

- Объяснения, вопросы, комментарии к изменениям и итоговые резюме — на русском.
- Имена файлов, фрагменты кода, команды терминала и технические идентификаторы оставляй как в проекте.
- Если пользователь явно попросит ответ на другом языке — следуй его просьбе.

## Дизайн-система проекта (Концепция B: «Стекло и переплёт»)
Сайт спроектирован как стеклянная перегородка современной лаборатории-мастерской:
- **Палитра:** Matte Black `#0E0E0E`, Seeded White Glass `#F3F1EC`, Electric Cobalt Glass `#1E3A8A` / `#0D3FA9`, Amber `#C47A2C`, Oxblood `#5C1F1A`.
- **Типографика:** `Plus Jakarta Sans` (чистый архитектурный гротеск внутри панелей) + `JetBrains Mono`.
- **Архитектура:** Массивные чёрные стальные импосты (mullions 4–8px), матовые рифлёные стеклянные панели, центральное кобальтовое стекло с подсветкой и логотипом FILO Professional.
- **Подробный гайд:** см. `DESIGN.md`.

## Скилы

Проектные скилы лежат в [`.cursor/skills/`](.cursor/skills/) — Cursor подхватывает их автоматически и показывает в **Customize → Skills** (и в Agent через `/имя-скилла`).

Каждый скилл — папка с `SKILL.md` и YAML frontmatter (`name`, `description`). Не дублируй те же скилы в `.agents/skills/` без явной просьбы.

Установлен **Taste Skill** (`design-taste-frontend`) из [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) — anti-slop для лендингов/редизайна. Для FILO не переписывает палитру/токены «Бразильская лаборатория» без явной просьбы; сначала бриф и существующая дизайн-система.

Установлен внешний пакет **UI/UX Pro Max** (`ui-ux-pro-max` + companion: `design`, `design-system`, `brand`, `ui-styling`, `banner-design`, `slides`) из [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill). Для FILO сначала держи контракт «Бразильская лаборатория»; Pro Max — для ревизий и поиска паттернов, не для смены палитры без явной просьбы.

## Редизайн и визуал

**Дизайн-система (концепция A «Ателье глазури»):** бумага `#E8E2D8`, глина `#C4B8A8` / `#9A8E7E`, celadon `#5F7F72`, oxblood `#6B2E2A`, уголь `#1A1A18`. Шрифты **Bodoni Moda** + **Work Sans** + **JetBrains Mono**. Editorial Swiss grid, ghost-CTA, hero-atelier с полкой флаконов. Каталог — shelf-grid; заказ — `/order.html`. См. `DESIGN.md`. Не возвращать cobalt/biskuit/Piazzolla без явной просьбы.

Порядок скилов при переработке внешнего вида сайта (не пропускай этапы без явной просьбы «сразу верстай»):

1. `design-direction` — допрос по вкусу и визуальным решениям (формат раундов как в `grilling`).
2. `design-references` — живые URL-примеры, 👍/👎, moodboard-контракт.
3. `landing-page-audit` — конверсия B2B, воронка, доверие.
4. `conversion-copy` — тексты hero, CTA, карточек.
5. `visual-motion` — анимация и визуальная сложность в текущем стеке (статика HTML/CSS/JS).
6. Внедрение в `index.html` / `catalog.html` / `src/styles/main.css` / `src/js/app.js`.
7. QA в браузере (computerUse): герой, каталог, корзина, header, мобилка.

Для локального SEO после контента — `seo-local`.

### Референсы в вебе

- **Предпочтительно Tavily** (поиск, extract, crawl): подборки премиум haircare / beauty e-com, разбор структуры блоков.
- Если MCP Tavily в статусе `needsAuth` или недоступен — **WebSearch / WebFetch**, без остановки задачи.
- Не копируй чужие ассеты и код; перенимай приёмы (ритм, иерархия, тип motion).
- GenerateImage — moodboard и «как мог бы выглядеть блок», не подмена скриншотов чужих сайтов.
- Якоря moodboard: ElmTree, Davines World/US, scroll-showcase (Pinterest).

### Фазы внедрения (зафиксировано)

1–8: tokens → header → hero/motion → home → catalog → cart/footer → scroll-story.
9: perf/a11y — skip-link, focus-visible, content-visibility на below-fold, decoding/fetchpriority, клавиатура hero/фильтров, aria story; без parallax при `prefers-reduced-motion` / coarse pointer.

