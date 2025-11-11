/**
 * Call-to-action block component - Button/link with variants and sizes
 */

import type { BlockComponentProps } from '../../types/blocks';
import type { CtaBlockData } from '../../types/block-data';

export default function CtaBlock({
  id,
  data,
}: BlockComponentProps<CtaBlockData>) {
  const { text, link, variant = 'primary', size = 'medium' } = data;

  return (
    <div id={id} className="cta-block">
      <a
        href={link}
        className={`cta-block__button cta-block__button--${variant} cta-block__button--${size}`}
      >
        {text}
      </a>
    </div>
  );
}
