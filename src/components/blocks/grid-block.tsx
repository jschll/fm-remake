/**
 * Grid block component - Responsive grid layout
 * Supports nested child blocks arranged in a grid
 */

import type { BlockComponentProps } from '../../types/blocks';
import type { GridBlockData } from '../../types/block-data';
import BlockLoader from '../block-loader';

export default function GridBlock({
  id,
  data,
  children,
}: BlockComponentProps<GridBlockData>) {
  const { columns = 3, gap = 'md', responsive } = data;

  const getGridClassName = () => {
    let className = `grid-block grid-block--gap-${gap}`;

    if (responsive) {
      if (responsive.mobile) {
        className += ` grid-block--mobile-${responsive.mobile}`;
      }
      if (responsive.tablet) {
        className += ` grid-block--tablet-${responsive.tablet}`;
      }
      if (responsive.desktop) {
        className += ` grid-block--desktop-${responsive.desktop}`;
      }
    } else {
      className += ` grid-block--columns-${columns}`;
    }

    return className;
  };

  return (
    <div id={id} className={getGridClassName()}>
      {children && children.length > 0 && <BlockLoader blocks={children} />}
    </div>
  );
}
