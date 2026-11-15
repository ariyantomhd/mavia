// src/components/blog/BlogDetailContentBox.tsx
import React from 'react';
import Image from 'next/image';

interface ContentBoxProps {
  articleId: string;
  content: string[];
}

export default function BlogDetailContentBox({ content }: ContentBoxProps) {
  return (
    <div className="space-y-8">
      {/* Hero Image Utama */}
      <div className="w-full h-72 sm:h-96 rounded-3xl relative overflow-hidden shadow-md">
        <Image 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop" 
          alt="Article Hero" 
          fill 
          className="object-cover"
          referrerPolicy="no-referrer" 
        />
      </div>

      {/* Konten Artikel Utama */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Brilliant design strategies & Marketing consectetur. ectus sed consequat magna aliquet feugiat diam.
        </h2>

        {content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        {/* Blockquote / Aksen Kutipan */}
        <div className="border-l-4 border-indigo-600 pl-4 py-2 my-4 text-slate-600 italic bg-indigo-50/50 rounded-r-xl text-xs sm:text-sm">
          &quot;Creación de las hojas Letraset, las cuales contenían pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker.&quot;
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-slate-900 pt-4">What You Should You Do Now</h3>
        <p>Lorem ipsum es simplemente el texto de relleno de las imprentas y archivos de texto estándar.</p>

        {/* Dua Gambar Pendukung di Tengah Artikel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 pb-2">
          <div className="relative h-48 rounded-2xl overflow-hidden shadow-sm">
            <Image src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=500&auto=format&fit=crop" alt="Team" fill className="object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="relative h-48 rounded-2xl overflow-hidden shadow-sm">
            <Image src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=500&auto=format&fit=crop" alt="Code" fill className="object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>

        {/* Share Timeline */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-bold text-slate-500">Share your timeline:</span>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold cursor-pointer">f</button>
            <button className="w-9 h-9 bg-sky-500 text-white rounded-full flex items-center justify-center font-bold cursor-pointer">t</button>
            <button className="w-9 h-9 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold cursor-pointer">in</button>
          </div>
        </div>
      </div>
    </div>
  );
}