/**
 * Hero block component - Large banner section with title, subtitle, and CTA
 */

import type { BlockComponentProps } from '../../types/blocks';
import type { HeroBlockData } from '../../types/block-data';

export default function HeroBlock({
  id,
  data,
}: BlockComponentProps<HeroBlockData>) {
  const {
    title,
    subtitle,
    backgroundImage,
    ctaText,
    ctaLink,
    alignment = 'center',
  } = data;

  return (
    <section
      id={id}
      className={`hero-block hero-block--${alignment}`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
      }}
    >
      <div className="hero-block__content">
        <h1 className="hero-block__title">{title}</h1>
        {subtitle && <p className="hero-block__subtitle">{subtitle}</p>}
        {ctaText && ctaLink && (
          <a href={ctaLink} className="hero-block__cta">
            {ctaText}
          </a>
        )}
      </div>
    </section>
  );
}
