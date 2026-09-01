type BrandMarkVariant = 'logo' | 'symbol' | 'hero-symbol';

type BrandMarkProps = {
  variant?: BrandMarkVariant;
  className?: string;
}

const BRAND_ASSETS: Record<BrandMarkVariant, { src: string; alt: string }> = {
  logo: { src: '/brand/svg/syrum-logo-white.svg', alt: 'SYRUM' },
  symbol: { src: '/brand/svg/syrum-symbol-landing-gradient.svg', alt: '' },
  'hero-symbol': { src: '/brand/svg/syrum-symbol-hero.svg', alt: 'símbolo syrum' },
};

/**
 * Renderiza os SVGs oficiais da marca a partir de seus caminhos públicos em
 * /brand/svg/. Os arquivos nunca são editados, redesenhados ou recriados —
 * apenas consumidos via <img>, o que preserva o arquivo original e deixa a
 * proporção sob controle do CSS (width definido pela classe + height:auto).
 *
 * variant="symbol"/"hero-symbol" é decorativo (alt vazio ou puramente
 * descritivo) porque o símbolo aparece como elemento visual de composição,
 * não como informação; variant="logo" carrega o nome da marca e é usado
 * dentro de um link para a página inicial.
 */
export default function BrandMark({ variant = 'logo', className }: BrandMarkProps) {
  const { src, alt } = BRAND_ASSETS[variant];
  const classes = ['syrum-brand-mark', `syrum-brand-mark-${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return <img src={src} alt={alt} className={classes} draggable={false} />;
}
