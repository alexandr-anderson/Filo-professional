#!/bin/bash
set -e

SRC_DIR="/home/c/cm149295/filo-src"
WEB_DIR="/home/c/cm149295/filo/public_html"

cd "$SRC_DIR"
git pull origin main

rsync -av --delete \
  index.html catalog.html about.html delivery.html privacy.html \
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
