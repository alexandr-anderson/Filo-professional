#!/bin/bash
set -euo pipefail

SRC_DIR="/home/c/cm149295/filo-src"
WEB_DIR="/home/c/cm149295/filo/public_html"
REPO_URL="https://github.com/alexandr-anderson/Filo-professional.git"
BRANCH="main"

cd "$SRC_DIR"

# Публичный репозиторий — pull без логина/пароля.
# 401 на сервере обычно из-за старых сохранённых credentials в git config.
if git remote get-url origin 2>/dev/null | grep -q '@github.com'; then
  echo "→ Сбрасываем origin на публичный HTTPS (без логина в URL)…"
  git remote set-url origin "$REPO_URL"
fi

echo "→ git pull origin $BRANCH…"
if ! GIT_TERMINAL_PROMPT=0 git -c credential.helper= pull origin "$BRANCH"; then
  echo ""
  echo "Ошибка git pull (часто HTTP 401 — старый пароль/token в credential helper)."
  echo "На сервере выполните один раз:"
  echo "  cd $SRC_DIR"
  echo "  git remote set-url origin $REPO_URL"
  echo "  git config --global --unset credential.helper 2>/dev/null || true"
  echo "  GIT_TERMINAL_PROMPT=0 git -c credential.helper= pull origin $BRANCH"
  echo ""
  echo "Пароль GitHub для HTTPS больше не работает — нужен PAT или SSH-ключ."
  echo "Для публичного репо достаточно команд выше (без токена)."
  exit 1
fi

rsync -av --delete \
  index.html catalog.html order.html about.html delivery.html privacy.html robots.txt sitemap.xml favicon.svg \
  "$WEB_DIR/"

rsync -av --delete src "$WEB_DIR/"
# Только images — не public/ целиком: --delete на корень удалил бы src/ и HTML
rsync -av --delete public/images/ "$WEB_DIR/images/"

rm -rf "$WEB_DIR/js" "$WEB_DIR/styles" "$WEB_DIR/data"
rm -f "$WEB_DIR/main.js"

echo ""
echo "=== public_html ==="
ls -la "$WEB_DIR/"

echo ""
echo "=== src ==="
ls -la "$WEB_DIR/src/"

echo ""
echo "=== images/products ==="
ls "$WEB_DIR/images/products/"

echo ""
echo "Deploy complete."
