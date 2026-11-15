// src/components/layout/NavbarBrand.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ThemeLogo from '@/components/ThemeLogo';

export default function NavbarBrand() {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
      <Image 
        src="/logo.png" 
        alt="ThemaVia Logo" 
        width={44}
        height={44}
        style={{ width: 'auto', height: 'auto' }}
        priority
      />
      <ThemeLogo size="lg" />
    </Link>
  );
}