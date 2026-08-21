import type { CtaLink } from '../types/landing';

type HeroActionsProps = {
  primary: CtaLink;
  secondary: CtaLink;
}

export default function HeroActions({ primary, secondary }: HeroActionsProps) {
  return (
    <div className="syrum-hero-actions">
      <a href={primary.href} className="syrum-btn syrum-btn-primary syrum-btn-lg">
        {primary.label}
      </a>
      <a href={secondary.href} className="syrum-btn syrum-btn-secondary syrum-btn-lg">
        {secondary.label}
      </a>
    </div>
  );
}
