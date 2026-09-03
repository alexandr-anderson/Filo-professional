#!/bin/bash
set -euo pipefail

SRC_DIR="/home/c/cm149295/filo-src"
WEB_DIR="/home/c/cm149295/filo/public_html"
REPO_URL="https://github.com/alexandr-anderson/Filo-professional.git"
ARCHIVE_URL="https://codeload.github.com/alexandr-anderson/Filo-professional/tar.gz/refs/heads/main"
BRANCH="main"

SOURCE_DIR="$SRC_DIR"

clear_git_credentials() {
  git config --global --unset credential.helper 2>/dev/null || true
  git config --local --unset credential.helper 2>/dev/null || true
  if [[ -f "$HOME/.git-credentials" ]] && grep -q github.com "$HOME/.git-credentials" 2>/dev/null; then
    echo "→ В ~/.git-credentials есть github.com — git может слать старый token."
    echo "  Если pull снова упадёт, удалите строку с github.com:"
    echo "  nano ~/.git-credentials"
  fi
}

try_git_pull() {
  cd "$SRC_DIR"
  if [[ ! -d .git ]]; then
    return 1
  fi

  if git remote get-url origin 2>/dev/null | grep -q '@github.com'; then
    echo "→ Сбрасываем origin на публичный HTTPS (без логина в URL)…"
    git remote set-url origin "$REPO_URL"
  fi

  clear_git_credentials

  echo "→ git pull origin $BRANCH…"
  GIT_TERMINAL_PROMPT=0 \
  GIT_ASKPASS=/bin/false \
  git -c credential.helper= \
      -c credential.helper="" \
      -c core.askPass= \
      pull origin "$BRANCH"
}

sync_from_github_archive() {
  local work
  work=$(mktemp -d)
  trap 'rm -rf "$work"' RETURN

  echo "→ Скачиваем main с GitHub (архив, без git login)…"
  curl -fsSL "$ARCHIVE_URL" | tar -xz -C "$work" --strip-components=1

  echo "→ Обновляем $SRC_DIR из архива…"
  rsync -a --delete \
    --exclude '.git' \
    "$work/" "$SRC_DIR/"

  SOURCE_DIR="$SRC_DIR"
}

if try_git_pull; then
  SOURCE_DIR="$SRC_DIR"
else
  echo ""
  echo "git pull не удался (401 / credential helper на сервере)."
  echo "Используем запасной способ — tarball с GitHub."
  echo ""
  sync_from_github_archive
fi

cd "$SOURCE_DIR"

require_path() {
  if [[ ! -e "$1" ]]; then
    echo "ОШИБКА: не найден $1 — деплой отменён, public_html не трогаем."
    exit 1
  fi
}

echo "→ Проверка исходников перед деплоем…"
require_path index.html
require_path catalog.html
require_path order.html
require_path src/main.js
require_path src/js/app.js
require_path src/styles/main.css
require_path public/favicon.svg
require_path public/images/products/cafe-verde.webp

rsync -av --delete \
  index.html catalog.html order.html about.html delivery.html privacy.html robots.txt sitemap.xml \
  "$WEB_DIR/"
rsync -av public/favicon.svg "$WEB_DIR/favicon.svg"

rsync -av --delete src "$WEB_DIR/"
# Только images — не public/ целиком: --delete на корень удалил бы src/ и HTML
rsync -av --delete public/images/ "$WEB_DIR/images/"

rm -rf "$WEB_DIR/js" "$WEB_DIR/styles" "$WEB_DIR/data"
rm -f "$WEB_DIR/main.js"

echo ""
echo "→ Проверка public_html после деплоя…"
for f in index.html catalog.html order.html src/main.js src/js/app.js src/styles/main.css favicon.svg; do
  if [[ ! -f "$WEB_DIR/$f" ]]; then
    echo "ОШИБКА: после деплоя нет $WEB_DIR/$f"
    exit 1
  fi
done

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
