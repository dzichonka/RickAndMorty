'use client';
import ThemeContext from '@/contexts/theme/ThemeContext';
import Link from 'next/link';
import { useContext } from 'react';
import { GrPaint } from 'react-icons/gr';

export function Header() {
  const { toggleTheme } = useContext(ThemeContext);
  return (
    <header className="section flex flex-row items-center justify-between">
      <nav className="bg-[var(--bg-color)]/70 shadow-[0_0_20px_15px_var(--bg-color)]/70 rounded">
        <Link className="link" href="/">
          Main
        </Link>{' '}
        |{' '}
        <Link className="link" href="/about">
          About
        </Link>
      </nav>
      <button
        className="btn-icon text-[1.5rem] !bg-[var(--bg-color)]/30 shadow-[0_0_15px_20px_var(--bg-color)]/30 rounded-full"
        onClick={toggleTheme}
      >
        <GrPaint />
      </button>
    </header>
  );
}
