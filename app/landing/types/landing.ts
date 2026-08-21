export type NavLink = {
  label: string;
  href: string;
}

export type CtaLink = {
  label: string;
  href: string;
}

export type HeroContent = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
}

export type BrandMarkVariant = 'logo' | 'symbol';
