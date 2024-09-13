#!/bin/bash
npm install
# Install Playwright
npm install -D @playwright/test@latest
# Install Playwright Browsers
npx playwright install --with-deps
# name: Build Astro Site
npm run build -mode production