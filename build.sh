#!/bin/bash
# Install the system dependencies for use with playwrite
#apt-get update && apt-get install -y chromium-browser
# Intall node packages
npm install
# Install Playwright
npm install -D @playwright/test@latest
# Install Playwright Browsers
# --with-deps does not work on cloudflare as no sudo?
# npx playwright install --with-deps
#  See https://playwright.dev/docs/browsers#install-system-dependencies
npx playwright install-deps chromium
# name: Build Astro Site
npm run build -mode production