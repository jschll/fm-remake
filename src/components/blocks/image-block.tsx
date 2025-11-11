/**
 * Image block component - Responsive image with optional caption
 */

import type { BlockComponentProps } from '../../types/blocks';
import type { ImageBlockData } from '../../types/block-data';

export default function ImageBlock({
  id,
  data,
}: BlockComponentProps<ImageBlockData>) {
  const { src, alt, caption, width, height } = data;

  return (
    <figure id={id} className="image-block">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="image-block__img"
        loading="lazy"
      />
      {caption && <figcaption className="image-block__caption">{caption}</figcaption>}
    </figure>
  );
}
