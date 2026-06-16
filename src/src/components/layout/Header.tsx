"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/learning", label: "学习进度" },
  { href: "/projects", label: "项目展示" },
  { href: "/knowledge", label: "知识网络" },
  { href: "/about", label: "关于我" },
];

export function Header() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [themeReady, setThemeReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.setTimeout(() => {
      const storedTheme = window.localStorage.getItem("theme");
      const nextTheme = storedTheme === "light" ? "light" : "dark";
      setTheme(nextTheme);
      setThemeReady(true);
    }, 0);
  }, []);

  useEffect(() => {
    if (!themeReady) return;

    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme, themeReady]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  return (
    <header className="glass sticky top-0 z-50 border-b border-border-default bg-glass-bg backdrop-blur-glass">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between gap-6">
          <Link
            href="/"
            className="shrink-0 text-lg font-semibold text-text-primary transition-colors hover:text-primary"
          >
            努力学习的勇者
          </Link>

          <nav className="hidden items-center gap-5 md:flex">
            <NavLinks />
            <button
              aria-label={theme === "dark" ? "切换到浅色模式" : "切换到深色模式"}
              className="group relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-border-default text-text-secondary transition-all hover:border-primary hover:bg-dark-hover hover:text-primary"
              type="button"
              onClick={toggleTheme}
            >
              <span className="absolute inset-0 flex items-center justify-center transition-all duration-300" style={{
                transform: theme === "dark" ? "translateY(0) rotate(0deg)" : "translateY(-150%) rotate(180deg)",
                opacity: theme === "dark" ? 1 : 0
              }}>
                <MoonIcon />
              </span>
              <span className="absolute inset-0 flex items-center justify-center transition-all duration-300" style={{
                transform: theme === "light" ? "translateY(0) rotate(0deg)" : "translateY(150%) rotate(-180deg)",
                opacity: theme === "light" ? 1 : 0
              }}>
                <SunIcon />
              </span>
            </button>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <button
              aria-label={theme === "dark" ? "切换到浅色模式" : "切换到深色模式"}
              className="group relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-border-default text-text-secondary transition-all hover:border-primary hover:bg-dark-hover hover:text-primary"
              type="button"
              onClick={toggleTheme}
            >
              <span className="absolute inset-0 flex items-center justify-center transition-all duration-300" style={{
                transform: theme === "dark" ? "translateY(0) rotate(0deg)" : "translateY(-150%) rotate(180deg)",
                opacity: theme === "dark" ? 1 : 0
              }}>
                <MoonIcon />
              </span>
              <span className="absolute inset-0 flex items-center justify-center transition-all duration-300" style={{
                transform: theme === "light" ? "translateY(0) rotate(0deg)" : "translateY(150%) rotate(-180deg)",
                opacity: theme === "light" ? 1 : 0
              }}>
                <SunIcon />
              </span>
            </button>
            <button
              aria-expanded={menuOpen}
              aria-label="打开导航菜单"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border-default text-text-secondary transition-colors hover:bg-dark-hover hover:text-text-primary"
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        {menuOpen ? (
          <nav className="grid gap-1 border-t border-border-subtle py-3 md:hidden">
            <NavLinks onNavigate={() => setMenuOpen(false)} />
          </nav>
        ) : null}
      </div>
    </header>
  );
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-md px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-dark-hover hover:text-text-primary"
          onClick={onNavigate}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
