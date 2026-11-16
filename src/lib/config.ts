// src/lib/config.ts
const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const API_BASE_URL = rawApiUrl
  .replace(/\/$/, '')
  .replace(/\/api$/, '');

export const APP_BASE_URL = (
  process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
).replace(/\/$/, '');