/**
 * Fundo cinematográfico 100% procedural — nenhuma imagem, vídeo ou textura
 * externa envolvida. As três camadas abaixo (luz ambiente + grão, grade de
 * profundidade, vinheta) são pintadas inteiramente em CSS a partir das
 * classes definidas em origin-scene.css:
 *
 * - .syrum-ambient-glow    → gradientes radiais roxo/azul + grão sutil (::after)
 * - .syrum-ambient-grid    → grade com leve perspectiva, mascarada até sumir
 * - .syrum-ambient-vignette → vinheta radial/linear para foco e legibilidade
 *
 * aria-hidden porque é puramente decorativo; o conteúdo real da cena vive em
 * OriginScene.
 */
export default function AmbientBackground() {
  return (
    <div className="syrum-ambient-background" aria-hidden="true">
      <div className="syrum-ambient-glow" />
      <div className="syrum-ambient-grid" />
      <div className="syrum-ambient-vignette" />
    </div>
  );
}
