'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { routing } from '@/i18n/routing';

export default function LangButton() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('locale');
    if (
      saved &&
      routing.locales.includes(saved as (typeof routing.locales)[number])
    ) {
      const segments = pathname.split('/');
      if (segments[1] !== saved) {
        segments[1] = saved;
        router.replace(segments.join('/'));
      }
      setCurrentLocale(saved as (typeof routing.locales)[number]);
    } else {
      localStorage.setItem('locale', 'en');
      setCurrentLocale('en');
    }
  }, [pathname, router]);

  const changeLocale = (newLocale: (typeof routing.locales)[number]) => {
    if (!routing.locales.includes(newLocale) || newLocale === currentLocale)
      return;

    const segments = pathname.split('/');
    if (
      routing.locales.includes(segments[1] as (typeof routing.locales)[number])
    ) {
      segments[1] = newLocale;
    } else {
      segments.unshift('', newLocale);
    }

    localStorage.setItem('locale', newLocale);
    setCurrentLocale(newLocale);
    router.push(segments.join('/'));
  };

  return (
    <div className="btn no-scale">
      {routing.locales.map((l) => (
        <button
          key={l}
          className={`p-1 ${l === currentLocale ? 'text-2xl' : 'text-sm'}`}
          onClick={() => changeLocale(l)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
