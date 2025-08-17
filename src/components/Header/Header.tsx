'use client';
import { useTranslations } from 'next-intl';
import ThemeContext from '@/contexts/theme/ThemeContext';
import { Link } from '@/i18n/navigation';
import { useContext } from 'react';
import { GrPaint } from 'react-icons/gr';
import LangButton from '../LangButton/LangButton';

export function Header() {
  const { toggleTheme } = useContext(ThemeContext);
  const t = useTranslations('header');
  return (
    <header className="section flex flex-row items-center justify-between">
      <nav className="bg-[var(--bg-color)]/70 shadow-[0_0_20px_15px_var(--bg-color)]/70 rounded">
        <Link className="link" href="/">
          {t('main')}
        </Link>{' '}
        |{' '}
        <Link className="link" href="/about">
          {t('about')}
        </Link>
      </nav>
      <div className="buttons flex flex-row items-center justify-center gap-2">
        {' '}
        <button
          className="btn-icon text-[1.5rem] !bg-[var(--bg-color)]/30 shadow-[0_0_15px_20px_var(--bg-color)]/30 rounded-full"
          onClick={toggleTheme}
        >
          <GrPaint />
        </button>
        <LangButton />
      </div>
    </header>
  );
}
