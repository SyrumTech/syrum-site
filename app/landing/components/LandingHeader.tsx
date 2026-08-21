import Link from 'next/link';

import { navLinks } from '../data/landing-content';
import BrandMark from './BrandMark';

/**
 * Navbar da landing. Continua Server Component: não há estado nem
 * interatividade além de links nativos, então nenhum "use client" é
 * necessário. No mobile, a navegação intermediária e o botão "Entrar" somem
 * via CSS (ver landing-shell.css) — sem drawer, sem JS de menu.
 */
export default function LandingHeader() {
  return (
    <header data-syrum-header className="syrum-landing-header">
      <div className="syrum-landing-header-inner">
        <Link href="/" className="syrum-landing-brand" aria-label="SYRUM — início">
          <BrandMark variant="logo" />
        </Link>

        <nav className="syrum-landing-nav" aria-label="Navegação principal">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="syrum-landing-header-actions">
          <Link href="https://app.syrum.com.br/login" className="syrum-btn syrum-btn-ghost">
            Entrar
          </Link>
          <a href="#demonstracao" className="syrum-btn syrum-btn-primary syrum-btn-sm">
            Solicitar demonstração
          </a>
        </div>
      </div>
    </header>
  );
}
