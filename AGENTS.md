# Инструкции для агента

## Язык общения

Всегда отвечай пользователю **на русском языке**, независимо от языка его сообщения.

- Объяснения, вопросы, комментарии к изменениям и итоговые резюме — на русском.
- Имена файлов, фрагменты кода, команды терминала и технические идентификаторы оставляй как в проекте.
- Если пользователь явно попросит ответ на другом языке — следуй его просьбе.

## Скилы

Проектные скилы лежат в [`.cursor/skills/`](.cursor/skills/) — Cursor подхватывает их автоматически и показывает в **Customize → Skills** (и в Agent через `/имя-скилла`).

Каждый скилл — папка с `SKILL.md` и YAML frontmatter (`name`, `description`). Не дублируй те же скилы в `.agents/skills/` без явной просьбы.

Внешние пакеты (для FILO сначала контракт «Бразильская лаборатория»; не меняй палитру/шрифты без явной просьбы):

- **UI/UX Pro Max** (`ui-ux-pro-max` + companion: `design`, `design-system`, `brand`, `ui-styling`, `banner-design`, `slides`) — [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill); ревизии и поиск паттернов.
- **Skills for Design Engineers** (`emil-design-eng` + motion: `animate`, `review-animations`, `improve-animations`, `find-animation-opportunities`, `apple-design`, …) — [emilkowalski/skills](https://github.com/emilkowalski/skills); polish UI и анимации.
- **Impeccable** (`impeccable`) — [pbakaus/impeccable](https://github.com/pbakaus/impeccable); audit/polish/анти-slop. Канон в `.cursor/skills/impeccable/`; symlink `.agents/skills/impeccable` → туда же, чтобы работали скрипты пакета (`node .agents/skills/impeccable/scripts/...`).

## Редизайн и визуал

**Дизайн-система (фаза 2 v2):** «Бразильская лаборатория» — бумага `#ECEDE8`, чернила `#121C29`, blush `#F2D8C6`, акцент-сигнал `#1F5C43`, шрифты **Piazzolla** + **Golos Text**, soft-rect `2px`, без pills/bronze/cream. Тепло — только в фото. Не возвращать Instrument Serif / Inter / deep green+bronze.

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

