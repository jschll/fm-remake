/**
 * Container block component - Wrapper with max-width and padding controls
 * Supports nested child blocks
 */

import type { BlockComponentProps } from '../../types/blocks';
import type { ContainerBlockData } from '../../types/block-data';
import BlockLoader from '../block-loader';

export default function ContainerBlock({
  id,
  data,
  children,
}: BlockComponentProps<ContainerBlockData>) {
  const { maxWidth = 'lg', padding = 'md', backgroundColor } = data;

  return (
    <div
      id={id}
      className={`container-block container-block--${maxWidth} container-block--padding-${padding}`}
      style={{ backgroundColor }}
    >
      {children && children.length > 0 && <BlockLoader blocks={children} />}
    </div>
  );
}
