// src/utils/sanitize.ts
import DOMPurify from 'dompurify';

/**
 * Membersihkan string teks biasa dari tag HTML berbahaya (Mencegah XSS)
 */
export function sanitizeText(dirty: string): string {
  if (typeof window === 'undefined') return dirty; // SSR fallback
  return DOMPurify.sanitize(dirty, { ALLOWED_TAGS: [] }); // Hapus semua tag HTML
}

/**
 * Membersihkan konten HTML (jika merender Rich Text / Markdown artikel blog)
 */
export function sanitizeHtml(dirtyHtml: string): string {
  if (typeof window === 'undefined') return dirtyHtml;
  return DOMPurify.sanitize(dirtyHtml, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'code', 'pre'],
    ALLOWED_ATTR: [],
  });
}
